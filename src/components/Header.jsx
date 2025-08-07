// src/components/Header.jsx

import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Header() {
  const { getTotalItems } = useContext(CartContext);

  return (
    <header className="site-header">
      <div className="header-top">
        <div className="brand">
          <Link to="/" className="brand-title">
            SE <span className="brand-highlight">Indumentaria</span> y Accesorios
          </Link>
        </div>

        <nav className="main-nav">
          <Link to="/" className="nav-link">
            Inicio
          </Link>
          <Link to="/category/indumentaria" className="nav-link">
            Indumentaria
          </Link>
          <Link to="/category/accesorios" className="nav-link">
            Accesorios
          </Link>
        </nav>

        <div className="cart-widget">
          <Link to="/cart" className="cart-link">
            🛍️ Carrito
            {getTotalItems() > 0 && (
              <span className="cart-badge">{getTotalItems()}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
