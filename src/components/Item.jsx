import { Link } from "react-router-dom";

const Item = ({ producto }) => {
  return (
    <div className="card-producto">
      <img src={producto.img} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>${producto.precio}</p>
      <p>{producto.cuotas}</p>
      <Link to={`/item/${producto.id}`}>Ver detalle</Link>
    </div>
  );
};

export default Item;
