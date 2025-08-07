import { useLocation, Link } from "react-router-dom";

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderId, name, total } = location.state || {};

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded text-center">
      {orderId ? (
        <>
          <h2 className="text-2xl font-bold mb-4 text-green-700">¡Gracias por tu compra, {name}!</h2>
          <p className="mb-2">Tu número de orden es:</p>
          <p className="text-lg font-mono text-gray-800 mb-4">{orderId}</p>
          <p className="mb-4 font-semibold">Total pagado: ${total}</p>
          <Link to="/">
            <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
              Volver al inicio
            </button>
          </Link>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold text-red-600 mb-4">No se encontró ninguna orden</h2>
          <Link to="/">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
              Volver al inicio
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default OrderConfirmation;
