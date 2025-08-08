import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeItem, clearCart, totalPrice, totalQuantity } = useContext(CartContext);

  const [cuotasSeleccionadas, setCuotasSeleccionadas] = useState(1);

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Tu carrito está vacío</h2>
        <Link to="/">Volver al catálogo</Link>
      </div>
    );
  }

  const maxCuotas = cart.reduce((max, item) => {
    return Math.max(max, item.cuotas || 1);
  }, 1);

  const total = totalPrice();
  const montoPorCuota = total / cuotasSeleccionadas;

  return (
    <div className="cart-container">
      <h2>Tu carrito</h2>
      {cart.map((item) => (
        <CartItem key={item.id} item={item} onRemove={removeItem} />
      ))}
      <div className="cart-summary">
        <p>Total productos: {totalQuantity()}</p>
        <p>Total a pagar: ${total.toFixed(2)}</p>

        <label htmlFor="cuotas-select" style={{ fontWeight: "600", marginRight: "0.5rem" }}>
          Seleccione cuotas:
        </label>
        <select
          id="cuotas-select"
          value={cuotasSeleccionadas}
          onChange={(e) => setCuotasSeleccionadas(Number(e.target.value))}
          style={{
            padding: "0.3rem 0.5rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
            minWidth: "120px",
            cursor: "pointer",
            fontSize: "0.95rem",
          }}
        >
          {[...Array(maxCuotas).keys()].map(i => (
            <option key={i + 1} value={i + 1}>
              {i + 1} {i + 1 === 1 ? "cuota" : "cuotas"} de ${ (total / (i + 1)).toFixed(2) }
            </option>
          ))}
        </select>

        <p style={{ marginTop: "1rem", fontStyle: "italic", color: "#555" }}>
          Monto por cuota: ${montoPorCuota.toFixed(2)}
        </p>
      </div>
      <button onClick={clearCart} className="btn-clear">Vaciar carrito</button>
      <Link to="/checkout">
        <button className="btn-checkout">Finalizar compra</button>
      </Link>
    </div>
  );
}
