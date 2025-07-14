import { Link } from 'react-router-dom';

function Item({ producto }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
      <img src={producto.img} alt={producto.nombre} style={{ width: '100%', height: 'auto' }} />
      <h3>{producto.nombre}</h3>
      <p>{producto.cuotas}</p>
      <p>${producto.precio.toLocaleString("es-AR")}</p>
      <Link to={`/item/${producto.id}`}>Ver detalle</Link>
    </div>
  );
}

export default Item;
