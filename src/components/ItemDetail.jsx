import ItemCount from "./ItemCount";

export default function ItemDetail({ producto, onAdd }) {
  return (
    <div className="product-detail-container">
      <img
        src={producto.img}
        alt={producto.nombre}
        className="product-detail-image"
      />
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
        <ItemCount stock={producto.stock || 10} initial={1} onAdd={onAdd} />
      </div>
    </div>
  );
}
