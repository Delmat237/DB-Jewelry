// pages/contact.js
import Head from 'next/head';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact | DB Jewelry</title>
      </Head>
     
            <div className="max-w-3xl mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold mb-6 text-gray-900">Contactez-nous</h1>
                <p className="text-gray-700 text-lg mb-8">
                Une question ? Une demande personnalisée ? N&apos;hésitez pas à nous écrire.
                </p>

                <form className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nom complet</label>
                    <input
                    type="text"
                    required
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Adresse e-mail</label>
                    <input
                    type="email"
                    required
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                    rows="5"
                    required
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 transition"
                >
                    Envoyer
                </button>
                </form>
            </div>
          
            </>

  );
}
