import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
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

    const body = {
      username: form.username,
      email: form.email,
      password: form.password,
      first_name: form.first_name,
      last_name: form.last_name,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });


      if (response.status === 201) { // 201 Created for successful registration

        //Envoie un message de Bienvenu
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      });

    
      const data = await response.json();
      
        localStorage.setItem('token', JSON.stringify({
          access: data.access,
          refresh: data.refresh,
          user: data.user // Store user info
        }));
  
     await fetch(`${process.env.NEXT_PUBLIC_API_URL}/send-email/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
              'Authorization': `Bearer ${data?.access}`,
          },
          body: JSON.stringify({
            subject: 'Bienvenu à DB Jewerly '+ form.first_name,
            message:"À DB Jewerly, nous sommes ravis de vous accueillir dans notre communauté. Votre inscription a été un succès et nous sommes impatients de vous offrir une expérience exceptionnelle.",
            from_email:'azangueleonel9@gmail.com'      ,
            to_email:form.email,
          }),
        });

        router.push('/'); 
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Une erreur s\'est produite, veuillez réessayer');
      }
    } catch (error) {
      console.error('Register error:', error);
      setError('Une erreur réseau s\'est produite');
    }
  };

  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-blue-800 text-2xl font-bold mb-6 text-center">Créer un compte</h1>
          <form onSubmit={handleRegister}>
            {error && (
              <p className="bg-red-100 text-red-600 px-4 py-2 rounded mb-4 text-sm">{error}</p>
            )}
            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-700">Username</label>
              <input
                type="text" // Changed from "name" to "text"
                name="username" // Fixed case
                required
                className="text-black w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
                value={form.username}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-700">Adresse e-mail</label>
              <input
                type="email"
                name="email"
                required
                className="text-black w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-700">Prénom</label>
              <input
                type="text"
                name="first_name"
                required
                className="text-black w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
                value={form.first_name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-700">Nom</label>
              <input
                type="text"
                name="last_name" // Fixed from "Last_name"
                required
                className="text-black w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
                value={form.last_name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-700">Mot de passe</label>
              <input
                type="password"
                name="password"
                required
                className="text-black w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
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
                className="text-black w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
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