import { useState } from "react";
import Boton from "./Boton";
import "./FormularioTarea.css";

function FormularioTarea({ onAgregar }) {
  const [titulo, setTitulo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo.trim()) return;
    onAgregar(titulo.trim());
    setTitulo("");
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <input
        className="formulario-input"
        value={titulo}
        placeholder="¿Qué hay que hacer?"
        onChange={(e) => setTitulo(e.target.value)}
      />
      <Boton variant="primary" text="Agregar" />
    </form>
  );
}

export default FormularioTarea;
