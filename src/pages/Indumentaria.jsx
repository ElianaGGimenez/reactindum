import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Link } from "react-router-dom";

export default function Indumentaria() {
  const [indumentaria, setIndumentaria] = useState([]);

  useEffect(() => {
    const fetchIndumentaria = async () => {
      try {
        const productosRef = collection(db, "productos");
        const q = query(productosRef, where("categoria", "==", "indumentaria"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setIndumentaria(data);
      } catch (error) {
        console.error("Error fetching indumentaria:", error);
      }
    };
    fetchIndumentaria();
  }, []);

  return (
    <div className="category-container">
      <h2>Indumentaria</h2>
      <div className="product-grid">
        {indumentaria.map(item => (
          <Link to={`/producto/${item.id}`} key={item.id} className="product-card">
            <img src={item.img} alt={item.nombre} loading="lazy" />
            <h3>{item.nombre}</h3>
            <p>${item.precio}</p>
            {item.cuotas && (
              <p className="installments">
                O en {item.cuotas} cuotas de $
                {(item.precio / item.cuotas).toFixed(2)}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
