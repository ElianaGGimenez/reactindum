import { useParams } from 'react-router-dom';
import productos from '../data/productos';
import ItemDetail from './ItemDetail';

function ItemDetailContainer() {
  const { itemId } = useParams();
  const producto = productos.find(p => p.id === parseInt(itemId));


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
