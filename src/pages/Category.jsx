import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import ItemList from "../components/ItemList";

const Category = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    const db = getFirestore();
    const productosRef = collection(db, "productos");
    const q = query(productosRef, where("categoria", "==", categoryId));

    getDocs(q)
      .then((snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductos(docs);
      })
      .finally(() => setLoading(false));
  }, [categoryId]);

  if (loading) return <p>Cargando productos...</p>;

  return (
    <>
      <h2 className="titulo">{categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}</h2>
      {productos.length > 0 ? (
        <ItemList productos={productos} />
      ) : (
        <p>No hay productos en esta categoría.</p>
      )}
    </>
  );
};

export default Category;
