import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../firebaseConfig";
import ItemList from "./ItemList";

export default function ItemListContainer() {
  const { categoria } = useParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProductos() {
      setLoading(true);
      try {
        const productosRef = collection(db, "productos");
        const q = categoria
          ? query(productosRef, where("categoria", "==", categoria))
          : productosRef;
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProductos(data);
      } catch (error) {
        console.error("Error fetching productos:", error);
        setProductos([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProductos();
  }, [categoria]);

  if (loading) return <p>Cargando productos...</p>;
  if (productos.length === 0) return <p>No hay productos para mostrar.</p>;

  return (
    <div className="category-container">
      <h2>{categoria ? categoria.charAt(0).toUpperCase() + categoria.slice(1) : "Todos los productos"}</h2>
      <ItemList productos={productos} />
    </div>
  );
}
