// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // ⚠️ À remplacer plus tard par l’appel à votre API Django
    if (email === 'ald@dbjewelry.com' && password === 'password1') {

      //Enregistrtement e,n loacl
          localStorage.setItem('user', JSON.stringify({
            email: email,
            password: password,
            role: "admin"
          }));

      router.push('/'); // redirection après connexion réussie
    } else {
      setError('Adresse email ou mot de passe incorrect');
    }
  };

  return (
    <>

      <main className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Connexion</h1>
          <form onSubmit={handleLogin}>
            {error && (
              <p className="bg-red-100 text-red-600 px-4 py-2 rounded mb-4 text-sm">{error}</p>
            )}
            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-700">Email</label>
              <input
                type="email"
                required
                className="text-black w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-1 text-sm text-gray-700">Mot de passe</label>
              <input
                type="password"
                required
                className="text-black w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Se connecter
            </button>
          </form>
            <p className='text-gray-700'>
              Vous n&apos;avez pas de compte ? <Link href="/register" className="text-black underline">Créer un compte</Link>
            </p>
        
        </div>
      </main>
  
    </>
  );
}
