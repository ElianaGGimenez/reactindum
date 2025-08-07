import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li><NavLink to="/" className="nav-link">Inicio</NavLink></li>
        <li><NavLink to="/indumentaria" className="nav-link">Indumentaria</NavLink></li>
        <li><NavLink to="/accesorios" className="nav-link">Accesorios</NavLink></li>
        <li><NavLink to="/carrito" className="nav-link">🛒</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;
