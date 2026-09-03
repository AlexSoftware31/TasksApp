import { useNavigate } from "react-router-dom";
import Boton from "./Boton";
import "./TarjetaTarea.css";

function TarjetaTarea({ id, titulo, estado, onEliminar, onCompletar }) {
  const navigate = useNavigate();

  const estadoClass =
    estado === "Completada"
      ? "completada"
      : estado === "En progreso"
        ? "en-progreso"
        : "pendiente";

  return (
    <li className={`tarjeta tarjeta--${estadoClass}`}>
      <div className="tarjeta-info">
        <h3 className="tarjeta-titulo">{titulo}</h3>
        <span className={`tarjeta-estado tarjeta-estado--${estadoClass}`}>
          {estado}
        </span>
      </div>
      <div className="tarjeta-acciones">
        {estado !== "Completada" && (
          <Boton
            variant="success"
            text="Completar"
            onPress={() => onCompletar(id)}
          />
        )}
        <Boton
          variant="info"
          text="Ver detalle"
          onPress={() => navigate(`/tareas/${id}`)}
        />
        <Boton
          variant="danger"
          text="Eliminar"
          onPress={() => onEliminar(id)}
        />
      </div>
    </li>
  );
}

export default TarjetaTarea;
