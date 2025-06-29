import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { FaBox, FaShoppingBag, FaUsers } from 'react-icons/fa';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ total_orders: 0, total_revenue: 0, low_stock_articles: 0, total_users: 0 });
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

    const fetchStats = async () => {
      try {
        setLoading(true);
        const token = JSON.parse(localStorage.getItem('token')).access;

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/admin/`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) {
          if (response.status === 401) throw new Error('Non autorisé. Veuillez vous reconnecter.');
          throw new Error('Erreur lors du chargement des statistiques.');
        }

        const data = await response.json();
        setStats({
          total_orders: data.total_orders,
          total_revenue: data.total_revenue,
          low_stock_articles: data.low_stock_articles,
          total_users: data.total_users,
        });
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message || 'Une erreur s’est produite lors du chargement des données.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  if (!user && !loading) return null;

  return (
    <>
      <Head>
        <title>Admin Dashboard | DB Jewelry</title>
      </Head>

      <div className="max-w-6xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold mb-8 text-blue-900">Tableau de bord Administrateur</h1>

        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded mb-6 text-center">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center text-gray-500">Chargement des données...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <AdminCard
                title="Commandes"
                value={`${stats.total_orders} au total`}
                icon={<FaShoppingBag className="text-green-600" />}
                link="/admin/orders"
              />
              <AdminCard
                title="Revenus"
                value={`${stats.total_revenue.toLocaleString()} XAF`}
                icon={<FaBox className="text-blue-600" />}
                link="/admin/orders"
              />
              <AdminCard
                title="Articles en faible stock"
                value={`${stats.low_stock_articles} articles`}
                icon={<FaBox className="text-red-600" />}
                link="/admin/products"
              />
              <AdminCard
                title="Utilisateurs"
                value={`${stats.total_users} clients`}
                icon={<FaUsers className="text-yellow-600" />}
                link="/admin/users"
              />
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Actions rapides</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/admin/products/new" className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 text-center">
                  Ajouter un produit
                </Link>
                <Link href="/admin/products" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-center">
                  Gérer les produits
                </Link>
                <Link href="/admin/orders" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 text-center">
                  Gérer les commandes
                </Link>
                <Link href="/admin/users" className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 text-center">
                  Gérer les utilisateurs
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

function AdminCard({ title, value, icon, link }) {
  return (
    <Link href={link} className="block">
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:bg-gray-50 transition">
        <div className="flex items-center gap-3">
          {icon}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
            <p className="text-2xl font-bold text-yellow-500">{value}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}