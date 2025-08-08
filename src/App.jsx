import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Indumentaria from "./pages/Indumentaria";
import Accesorios from "./pages/Accesorios";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { CartProvider } from "./context/CartContext";

import "./store.css";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          <header>
            <Navbar />
          </header>

          {/* Placeholder para que el contenido no quede tapado */}
          <div className="navbar-placeholder"></div>

          <main className="main-content">
            <h1 className="store-title">SE Indumentaria y Accesorios</h1>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/indumentaria" element={<Indumentaria />} />
              <Route path="/accesorios" element={<Accesorios />} />
              <Route path="/producto/:id" element={<ProductDetail />} />
              <Route path="/carrito" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
