import { Link } from "react-router-dom";

export default function Item({ producto }) {
  return (
    <div className="product-card">
      <Link to={`/producto/${producto.id}`}>
        <img src={producto.img} alt={producto.nombre} loading="lazy" />
        <h3>{producto.nombre}</h3>
        <p>${producto.precio}</p>
        {producto.cuotas && (
          <p className="installments">
            O en {producto.cuotas} cuotas de $
            {(producto.precio / producto.cuotas).toFixed(2)}
          </p>
        )}
      </Link>
    </div>
  );
}
