export default function CartItem({ item, onRemove }) {
  return (
    <div className="cart-item">
      <img src={item.img} alt={item.nombre} className="cart-item-image" />
      <div className="cart-item-info">
        <h4>{item.nombre}</h4>
        <p>Cantidad: {item.quantity}</p>
        <p>Precio unitario: ${item.precio}</p>
        <p>
          Subtotal: ${(item.precio * item.quantity).toFixed(2)}
        </p>
        <button onClick={() => onRemove(item.id)}>Eliminar</button>
      </div>
    </div>
  );
}
