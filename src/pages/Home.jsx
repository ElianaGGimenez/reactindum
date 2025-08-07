import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Link } from "react-router-dom";

export default function Home() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const productosRef = collection(db, "productos");
        const snapshot = await getDocs(productosRef);
        const productosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProductos(productosData);
      } catch (error) {
        console.error("Error fetching productos:", error);
      }
    };
    fetchProductos();
  }, []);

  return (
    <div className="home-container">
      <h2>Productos Destacados</h2>
      <div className="carousel">
        {productos.slice(0, 6).map(producto => (
          <Link to={`/product/${producto.id}`} key={producto.id} className="carousel-card">
            <img
              src={producto.img}
              alt={producto.nombre}
              className="carousel-image"
              loading="lazy"
            />
            <div className="carousel-info">
              <h3>{producto.nombre}</h3>
              <p>${producto.precio}</p>
              {producto.cuotas && (
                <p className="installments">
                  O en {producto.cuotas} cuotas de $
                  {(producto.precio / producto.cuotas).toFixed(2)}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
