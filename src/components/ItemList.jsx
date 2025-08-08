import Item from "./Item";

export default function ItemList({ productos }) {
  return (
    <div className="product-grid">
      {productos.map((producto) => (
        <Item key={producto.id} producto={producto} />
      ))}
    </div>
  );
}
