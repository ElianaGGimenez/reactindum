import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import ItemDetail from './ItemDetail';

function ItemDetailContainer() {
  const { itemId } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const docRef = doc(db, 'productos', itemId);

    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          setProducto({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log('Producto no encontrado');
        }
      })
      .catch((error) => console.error('Error al obtener producto:', error))
      .finally(() => setLoading(false));
  }, [itemId]);

  if (loading) return <p>Cargando detalle...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      {producto ? (
        <ItemDetail producto={producto} />
      ) : (
        <p>Producto no encontrado</p>
      )}
    </div>
  ); 
}

export default ItemDetailContainer;
