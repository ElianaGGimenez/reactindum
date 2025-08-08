import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, name, cart, total } = location.state || {};

  useEffect(() => {
    if (!orderId) {
      navigate("/");
    }
  }, [orderId, navigate]);

  return (
    <div className="max-w-2xl mx-auto p-4 mt-10 bg-white shadow-lg rounded">
      <h1 className="text-2xl font-bold text-center mb-4">¡Gracias por tu compra, {name}!</h1>
      <p className="text-center mb-4">Tu número de orden es:</p>
      <p className="text-center font-mono text-lg text-indigo-600 mb-6">{orderId}</p>

      <h2 className="text-xl font-semibold mb-2">Resumen del pedido:</h2>
      <ul className="divide-y divide-gray-200 mb-4">
        {cart.map((item) => (
          <li key={item.id} className="py-2 flex justify-between">
            <span>{item.nombre} (x{item.quantity})</span>
            <span>${item.precio * item.quantity}</span>
          </li>
        ))}
      </ul>

      <div className="text-right font-bold text-lg">
        Total: ${total}
      </div>
    </div>
  );
};

export default OrderConfirmation;
