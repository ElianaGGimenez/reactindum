import { useState } from "react";
import CheckoutForm from "../components/CheckoutForm";
import { useCart } from "../context/CartContext"; 
import { addDoc, collection, serverTimestamp, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function Checkout() {
  const { cart, clearCart, totalPrice } = useCart();
  const [orderId, setOrderId] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async (datosCliente) => {
    setLoading(true);
    try {
      // 1. Validar stock antes de crear la orden
      for (const item of cart) {
        const docRef = doc(db, "productos", item.id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          alert(`El producto "${item.nombre}" ya no está disponible.`);
          setLoading(false);
          return;
        }
        const productoData = docSnap.data();
        if (productoData.stock < item.quantity) {
          alert(`No hay stock suficiente para "${item.nombre}". Stock disponible: ${productoData.stock}`);
          setLoading(false);
          return;
        }
      }

      // 2. Si todo OK, crear la orden
      const order = {
        buyer: datosCliente,
        items: cart,
        total: totalPrice(),
        date: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "orders"), order);

      // 3. Reducir stock de productos en Firestore
      for (const item of cart) {
        const productRef = doc(db, "productos", item.id);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          const currentStock = productSnap.data().stock || 0;
          await updateDoc(productRef, {
            stock: currentStock - item.quantity,
          });
        }
      }

      setOrderId(docRef.id);
      setOrderData({ ...order, id: docRef.id });
      clearCart();
    } catch (error) {
      console.error("Error al crear la orden: ", error);
      alert("Ocurrió un error al procesar tu compra. Por favor, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Cargando...</p>;

  if (orderId)
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>¡Gracias por tu compra!</h2>
        <p>Tu número de orden es: <strong>{orderId}</strong></p>

        <h3>Datos del comprador:</h3>
        <p>Nombre: {orderData.buyer.nombre}</p>
        <p>Email: {orderData.buyer.email}</p>
        <p>Dirección: {orderData.buyer.direccion}</p>
        <p>Teléfono: {orderData.buyer.telefono}</p>

        <h3>Productos comprados:</h3>
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {orderData.items.map(item => (
            <li key={item.id} style={{ marginBottom: "0.5rem" }}>
              {item.nombre} - Cantidad: {item.quantity} - Precio unitario: ${item.precio.toFixed(2)} - Subtotal: ${(item.precio * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>

        <h3>Total pagado: ${orderData.total.toFixed(2)}</h3>
      </div>
    );

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
      <h2>Finalizar Compra</h2>
      <CheckoutForm onConfirm={handleConfirm} />
    </div>
  );
}
