import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const docRef = doc(db, "productos", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProducto(docSnap.data());
        } else {
          console.log("No existe el producto");
        }
      } catch (error) {
        console.error("Error al cargar el producto:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducto();
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (!producto) return <p>Producto no encontrado</p>;

  const handleAddToCart = () => {
    addToCart({ id, ...producto }, 1);
    alert("Producto agregado al carrito");
  };

  return (
    <div className="product-detail-container">
      <img src={producto.img} alt={producto.nombre} className="product-detail-image" />
      <div className="product-detail-info">
        <h2>{producto.nombre}</h2>
        <p className="price">${producto.precio}</p>
        {producto.cuotas ? (
          <p className="installments">
            O en {producto.cuotas} cuotas de $
            {(producto.precio / producto.cuotas).toFixed(2)}
          </p>
        ) : (
          <p className="installments">Pago al contado</p>
        )}
        <p>{producto.descripcion || "Descripción no disponible."}</p>
        <button onClick={handleAddToCart} className="btn-add-cart">
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
