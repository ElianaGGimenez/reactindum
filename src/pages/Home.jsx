import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Link } from "react-router-dom";

export default function Home() {
  const [productosDestacados, setProductosDestacados] = useState([]);

  useEffect(() => {
    const fetchDestacados = async () => {
      try {
        const productosRef = collection(db, "productos");
        const snapshot = await getDocs(productosRef);
        const productos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProductosDestacados(productos.slice(0, 5)); // primeros 5 productos
      } catch (error) {
        console.error("Error cargando productos destacados:", error);
      }
    };
    fetchDestacados();
  }, []);

  return (
    <div className="home-container">
      <h2>Productos Destacados</h2>
      <div className="carousel">
        {productosDestacados.map(producto => (
          <Link
            to={`/producto/${producto.id}`}
            key={producto.id}
            className="carousel-card"
          >
            <img
              src={producto.img}
              alt={producto.nombre}
              className="carousel-image"
              loading="lazy"
            />
            <div className="carousel-info">
              <h3>{producto.nombre}</h3>
              <p>${producto.precio}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
