import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function OrderDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/orders/${id}`)
      .then(res => res.json())
      .then(data => setOrder(data));
  }, [id]);

  if (!order) return <p className="text-center mt-10">Chargement...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Détail commande #{order.id}</h2>
      <p><strong>Client :</strong> {order.customer_name}</p>
      <p><strong>Total :</strong> {order.total_price} XAF</p>
      <p><strong>Status :</strong> {order.status}</p>
      <p><strong>Date :</strong> {new Date(order.created_at).toLocaleString()}</p>

      <h3 className="mt-6 font-semibold">Articles :</h3>
      <ul className="list-disc pl-6 mt-2">
        {order.items.map((item, index) => (
          <li key={index}>
            {item.product_name} × {item.quantity} — {item.price * item.quantity} XAF
          </li>
        ))}
      </ul>
    </div>
  );
}
