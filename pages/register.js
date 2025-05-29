// pages/register.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    // 🔐 À remplacer plus tard par l'appel à l'API Django
    console.log('Inscription simulée avec :', form);
    router.push('/login');
  };

  return (
    <>
     
      <main className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Créer un compte</h1>
          <form onSubmit={handleRegister}>
            {error && (
              <p className="bg-red-100 text-red-600 px-4 py-2 rounded mb-4 text-sm">{error}</p>
            )}
            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-700">Nom complet</label>
              <input
                type="text"
                name="name"
                required
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-700">Adresse e-mail</label>
              <input
                type="email"
                name="email"
                required
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-700">Mot de passe</label>
              <input
                type="password"
                name="password"
                required
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
                value={form.password}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-1 text-sm text-gray-700">Confirmer le mot de passe</label>
              <input
                type="password"
                name="confirmPassword"
                required
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              S&#39;inscrire
            </button>
          </form>
          <p className="text-sm text-center mt-4 text-gray-600">
            Vous avez déjà un compte ? <Link href="/login" className="text-black underline">Se connecter</Link>
          </p>
         
        </div>
      </main>
     
    </>
  );
}
