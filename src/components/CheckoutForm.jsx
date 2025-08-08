import { useState } from "react";

export default function CheckoutForm({ onConfirm }) {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    direccion: "",
    telefono: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.nombre) tempErrors.nombre = "Nombre es obligatorio";
    if (!formData.email) tempErrors.email = "Email es obligatorio";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email inválido";
    if (!formData.direccion) tempErrors.direccion = "Dirección es obligatoria";
    if (!formData.telefono) tempErrors.telefono = "Teléfono es obligatorio";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onConfirm(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <div>
        <label>Nombre completo:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
        {errors.nombre && <p className="error">{errors.nombre}</p>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div>
        <label>Dirección:</label>
        <input
          type="text"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
        />
        {errors.direccion && <p className="error">{errors.direccion}</p>}
      </div>
      <div>
        <label>Teléfono:</label>
        <input
          type="tel"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
        />
        {errors.telefono && <p className="error">{errors.telefono}</p>}
      </div>
      <button type="submit" className="btn-finalizar">Confirmar pedido</button>
    </form>
  );
}
