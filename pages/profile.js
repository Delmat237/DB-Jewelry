// pages/profile.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';


export default function Profile() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) return null;

  return (
    <>
      <Head>
        <title>Mon Profil | DB Jewelry</title>
      </Head>

      <div className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6 text-yellow-900">Mon Profil</h1>
        <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
          <div>
            <span className="text-gray-600">Nom complet :</span>
            <p className="text-blue-900 text-lg font-semibold ">{user.full_name || 'Utilisateur'}</p>
          </div>
          <div>
            <span className="text-gray-600">Email :</span>
            <p className="text-blue-900  text-lg font-semibold">{user.email}</p>
          </div>
          <div>
            <span className="text-gray-600">Rôle :</span>
            <p className="text-blue-400  text-lg font-semibold capitalize">{user.role || 'client'}</p>
          </div>
        </div>
      </div>
  
    </>
  );
}
