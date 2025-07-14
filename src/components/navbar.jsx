import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";

function NavBar() {
  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "1rem", alignItems: "center" }}>
      <h1>SE Indumentaria y Accesorios</h1>
      <Link to="/">Inicio</Link>
      <Link to="/category/indumentaria">Indumentaria</Link>
      <Link to="/category/accesorios">Accesorios</Link>
      <CartWidget />
    </nav>
  );
}

export default NavBar;
