import productos from '../data/productos';
import Item from './Item';

function ItemList({ categoryId }) {
  const filtrados = categoryId
    ? productos.filter(prod => prod.categoria === categoryId)
    : productos;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
      {filtrados.map(prod => (
        <Item key={prod.id} producto={prod} />
      ))}
    </div>
  );
}

export default ItemList;
