import { useParams } from 'react-router-dom';
import ItemList from './ItemList';

function ItemListContainer() {
  const { categoryId } = useParams();

  return (
    <div style={{ padding: '1rem' }}>
      <h2>{categoryId ? `Productos de ${categoryId}` : 'Todos los productos de SE Indumentaria y Accesorios'}</h2>
      <ItemList categoryId={categoryId} />
    </div>
  );
}

export default ItemListContainer;
