import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import ItemDetail from "./ItemDetail";
import { useCart } from "../context/CartContext";

export default function ItemDetailContainer() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProducto() {
      setLoading(true);
      try {
        const docRef = doc(db, "productos", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProducto({ id: docSnap.id, ...docSnap.data() });
        } else {
          setProducto(null);
        }
      } catch (error) {
        console.error(error);
        setProducto(null);
      } finally {
        setLoading(false);
        setAdded(false);
      }
    }
    fetchProducto();
  }, [id]);

  const handleAddToCart = (cantidad) => {
    addToCart(producto, cantidad);
    setAdded(true);
  };

  if (loading) return <p>Cargando producto...</p>;
  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <>
      {!added ? (
        <ItemDetail producto={producto} onAdd={handleAddToCart} />
      ) : (
        <div className="added-message">
          <p>Producto agregado al carrito.</p>
          <button onClick={() => setAdded(false)}>Agregar más</button>
          <Link to="/carrito">
            <button>Ir al carrito</button>
          </Link>
        </div>
      )}
    </>
  );
}
