import { useParams, useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import "./DetallePage.css";

function DetallePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tareas] = useLocalStorage("TasksFlow", []);

  const tarea = tareas.find((t) => String(t.id) === String(id));

  if (!tarea) {
    return (
      <div className="detalle-page">
        <div className="detalle-error">
          <p className="detalle-error-icon">🔍</p>
          <p>No se encontró la tarea con ID #{id}.</p>
          <button className="detalle-btn-volver" onClick={() => navigate("/tareas")}>
            ← Volver a tareas
          </button>
        </div>
      </div>
    );
  }

  const estadoClass =
    tarea.estado === "Completada"
      ? "completada"
      : tarea.estado === "En progreso"
        ? "en-progreso"
        : "pendiente";

  return (
    <div className="detalle-page">
      <div className="detalle-card">
        <div className="detalle-card-header">
          <span className="detalle-badge">Tarea #{tarea.id}</span>
          <span className={`detalle-estado detalle-estado--${estadoClass}`}>
            {tarea.estado === "Completada"
              ? "✓ Completada"
              : tarea.estado === "En progreso"
                ? "● En progreso"
                : "○ Pendiente"}
          </span>
        </div>

        <h1 className="detalle-titulo">{tarea.titulo}</h1>

        <div className="detalle-meta">
          <div className="detalle-meta-item">
            <span className="detalle-meta-label">ID</span>
            <span className="detalle-meta-valor">{tarea.id}</span>
          </div>
          <div className="detalle-meta-item">
            <span className="detalle-meta-label">Estado</span>
            <span className="detalle-meta-valor">{tarea.estado}</span>
          </div>
        </div>

        <div className="detalle-acciones">
          <button
            className="detalle-btn-volver"
            onClick={() => navigate("/tareas")}
          >
            ← Volver a tareas
          </button>
          <button
            className="detalle-btn-inicio"
            onClick={() => navigate("/")}
          >
            Ir al inicio
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetallePage;
