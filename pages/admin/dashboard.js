// pages/admin/dashboard.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';



export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log(storedUser)
    if (!storedUser) {
      router.push('/login');
    } else {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role !== 'admin') {
        router.push('/');
      } else {
        setUser(parsedUser);
      }
    }
  }, []);

  if (!user) return null;

  return (
    <>
      <Head>
        <title>Admin Dashboard | DB Jewelry</title>
      </Head>

      <div className="max-w-6xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold mb-8 text-blue-900">Tableau de bord Administrateur</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AdminCard title="Produits" value="124 articles" />
          <AdminCard title="Commandes" value="32 en cours" />
          <AdminCard title="Utilisateurs" value="56 clients" />
        </div>
      </div>
     
    </>
  );
}

function AdminCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-2xl font-bold text-yellow-500">{value}</p>
    </div>
  );
}
