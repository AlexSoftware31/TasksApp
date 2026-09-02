import { useState, useEffect } from "react";
import "./Buscador.css";
import Boton from "./Boton";

function Buscador({ onBuscar }) {
  const [texto, setTexto] = useState("");


  useEffect(() => {
    onBuscar(texto);
  }, [texto, onBuscar]);


  const clear = () => {
    setTexto("");
    onBuscar("");
  }

  return (
    <div className="buscador">
      <input
        className="buscador-input"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Buscar tarea..."
      />
      
      <Boton text="Limpiar" onPress={clear} variant="primary" />
    </div>
  );
}

export default Buscador;
