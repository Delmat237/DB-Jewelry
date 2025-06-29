import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { FaEye, FaSync } from 'react-icons/fa';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const parsedToken = JSON.parse(token);
      if (!parsedToken.user || parsedToken.user.role !== 'admin') {
        router.push('/');
        return;
      }

      setUser(parsedToken.user);
    } catch (err) {
      console.error('Erreur lors du parsing du token :', err);
      localStorage.removeItem('token');
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = JSON.parse(localStorage.getItem('token')).access;
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) {
          if (response.status === 401) throw new Error('Non autorisé. Veuillez vous reconnecter.');
          throw new Error('Erreur lors du chargement des commandes.');
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message || 'Une erreur s’est produite lors du chargement des commandes.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Erreur lors de la mise à jour du statut.');
      
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (err) {
      console.error('Update error:', err);
      setError(err.message || 'Erreur lors de la mise à jour du statut.');
    }
  };

  if (!user && !loading) return null;

  return (
    <>
      <Head>
        <title>Gestion des Commandes | DB Jewelry</title>
      </Head>

      <div className="max-w-6xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold mb-8 text-blue-900">Gestion des Commandes</h1>

        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded mb-6 text-center">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center text-gray-500">Chargement des commandes...</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-gray-500">Aucune commande trouvée.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Commande</th>
                  <th className="px-4 py-2">Client</th>
                  <th className="px-4 py-2">Total</th>
                  <th className="px-4 py-2">Statut</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">#{order.id}</td>
                    <td className="px-4 py-2">{order.client_name}</td>
                    <td className="px-4 py-2">{order.total_amount.toLocaleString()} XAF</td>
                    <td className="px-4 py-2">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option value="PENDING">En attente</option>
                        <option value="COMPLETED">Complétée</option>
                        <option value="CANCELLED">Annulée</option>
                      </select>
                    </td>
                    <td className="px-4 py-2">{new Date(order.created_at).toLocaleDateString('fr-FR')}</td>
                    <td className="px-4 py-2">
                      <Link href={`/admin/orders/${order.id}`} className="text-blue-600 hover:text-blue-800">
                        <FaEye title="Voir détails" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}