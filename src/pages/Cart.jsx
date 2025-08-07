import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const [cuotas, setCuotas] = useState(1);
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>El carrito está vacío.</p>;
  }

  const handleCheckout = () => navigate("/checkout");

  return (
    <div className="cart-container">
      <h2>Tu carrito</h2>

      <button className="btn-clear" onClick={clearCart}>Vaciar carrito</button>

      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.img} alt={item.nombre} className="cart-item-image" />
            <div className="cart-item-info">
              <h3>{item.nombre}</h3>
              <p>Precio unitario: ${item.precio}</p>
              <div>
                <label>Cantidad:</label>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={e => updateQuantity(item.id, Number(e.target.value))}
                />
              </div>
              <p>Subtotal: ${(item.precio * item.quantity).toFixed(2)}</p>
              <button className="btn-remove" onClick={() => removeFromCart(item.id)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cuotas-section">
        <h3>Opciones de cuotas</h3>
        <label>Elegir cuotas:</label>
        <select value={cuotas} onChange={e => setCuotas(Number(e.target.value))}>
          {[1, 3, 6, 9, 12].map(n => (
            <option key={n} value={n}>
              {n} {n === 1 ? "cuota sin interés" : "cuotas"}
            </option>
          ))}
        </select>
      </div>

      <div className="total-section">
        <h3>Total de la compra</h3>
        <p>Total: <strong>${totalPrice.toFixed(2)}</strong></p>
        <p>
          En {cuotas} {cuotas === 1 ? "cuota" : "cuotas"} de{" "}
          <strong>${(totalPrice / cuotas).toFixed(2)}</strong>
        </p>
        <button className="btn-checkout" onClick={handleCheckout}>
          Finalizar compra
        </button>
      </div>
    </div>
  );
}
