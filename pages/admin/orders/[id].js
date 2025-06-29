import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function OrderDetailsPage() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const { id } = router.query;

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

      const fetchOrder = async () => {
        try {
          setLoading(true);
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}/`, {
            headers: { 'Authorization': `Bearer ${parsedToken.access}` },
          });

          if (!response.ok) {
            if (response.status === 401) throw new Error('Non autorisé. Veuillez vous reconnecter.');
            throw new Error('Erreur lors du chargement de la commande.');
          }

          const data = await response.json();
          setOrder(data);
        } catch (err) {
          console.error('Fetch error:', err);
          setError(err.message || 'Une erreur s’est produite.');
        } finally {
          setLoading(false);
        }
      };

      if (id) fetchOrder();
    } catch (err) {
      console.error('Erreur lors du parsing du token :', err);
      localStorage.removeItem('token');
      router.push('/login');
    }
  }, [id, router]);

  if (!order && !loading) return null;

  return (
    <>
      <Head>
        <title>Détails de la Commande #{id} | DB Jewelry</title>
      </Head>

      <div className="max-w-6xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold mb-8 text-blue-900">Détails de la Commande #{id}</h1>

        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded mb-6 text-center">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center text-gray-500">Chargement de la commande...</div>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Informations</h2>
            <p><strong>Client:</strong> {order.client_name}</p>
            <p><strong>Téléphone:</strong> {order.client_phone}</p>
            <p><strong>Total:</strong> {order.total_amount.toLocaleString()} XAF</p>
            <p><strong>Statut:</strong> {order.status === 'PENDING' ? 'En attente' : order.status === 'COMPLETED' ? 'Complétée' : 'Annulée'}</p>
            <p><strong>Date:</strong> {new Date(order.created_at).toLocaleDateString('fr-FR')}</p>

            <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-4">Articles</h2>
            <ul className="space-y-2">
              {order.items.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>{(item.price * item.quantity).toLocaleString()} XAF</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}