import { useEffect, useState } from 'react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const res = {};//await fetch('/api/orders'); // temporaire
      const data = await res.json();
      setOrders(data);
    }
    fetchOrders();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Commandes client</h1>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Commande</th>
              <th className="px-4 py-2">Client</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Statut</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-b">
                <td className="px-4 py-2">#{order.id}</td>
                <td className="px-4 py-2">{order.customer_name}</td>
                <td className="px-4 py-2">{order.total_price} XAF</td>
                <td className="px-4 py-2">{order.status}</td>
                <td className="px-4 py-2">{new Date(order.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
