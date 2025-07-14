function ItemDetail({ producto }) {
  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
      <img src={producto.img} alt={producto.nombre} style={{ width: '100%', height: 'auto' }} />
      <h2>{producto.nombre}</h2>
      <p>Precio: ${producto.precio.toLocaleString("es-AR")}</p>
      <p>Cuotas: {producto.cuotas}</p>
      <p>Categoría: {producto.categoria}</p>
      <button>Agregar al carrito</button>
    </div>
  );
}

export default ItemDetail;
