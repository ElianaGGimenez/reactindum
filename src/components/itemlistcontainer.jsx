import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import ItemList from "./ItemList";

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productosRef = collection(db, "productos");

    getDocs(productosRef)
      .then((res) => {
        const productosFormateados = res.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setProductos(productosFormateados);
      })
      .catch((err) => console.log("Error al traer productos:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <h2>Cargando productos...</h2>;

  return (
    <div>
      <h1>Catálogo de productos</h1>
      <ItemList productos={productos} />
    </div>
  );
};

export default ItemListContainer;
