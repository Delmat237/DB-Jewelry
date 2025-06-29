import { useState } from 'react';
import Head from 'next/head';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Basic client-side validation
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error('Veuillez remplir tous les champs.');
      }
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        throw new Error('Adresse e-mail invalide.');
      }

         const token = JSON.parse(localStorage.getItem('token'))?.access;
        if (!token) {
          setError('Vous devez être connecté en tant qu\'admin.');
          router.push('/login');
          return;
        }
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/send-email/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          subject: 'Nouveau message de contact de '+ formData.name + " " + formData.email,
          message:formData.message,
          from_email: formData.email,
          to_email:'azangueleonel9@gmail.com'
        }),
      });
      console.log("Response", response)

      if (!response.ok) {
        throw new Error('Erreur lors de l’envoi du message. Veuillez réessayer.');
      }

      setSuccess('Message envoyé avec succès ! Nous vous répondrons bientôt via : '+formData.email);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError(err.message || 'Une erreur s’est produite. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact | DB Jewelry</title>
      </Head>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6 text-blue-900">Contactez-nous</h1>
        <p className="text-gray-700 text-lg mb-8">
          Une question ? Une demande personnalisée ? N’hésitez pas à nous écrire.
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded mb-6 text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-600 px-4 py-2 rounded mb-6 text-center">
            {success}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom complet</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500 disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Adresse e-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500 disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={loading}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500 disabled:bg-gray-100"
            ></textarea>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 transition disabled:bg-yellow-300"
          >
            {loading ? 'Envoi en cours...' : 'Envoyer'}
          </button>
        </div>
      </div>
    </>
  );
}