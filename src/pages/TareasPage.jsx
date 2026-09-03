import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import TarjetaTarea from "../components/TarjetaTarea";
import "./TareasPage.css";
import { useCallback } from "react";

const FILTROS = ["Todas", "Pendiente", "En progreso", "Completada"];

function TareasPage() {
  const navigate = useNavigate();
  const [tareas, setTareas] = useLocalStorage("TasksFlow", []);
  const [filtro, setFiltro] = useState("Todas");

  const tareasFiltradas =
    filtro === "Todas" ? tareas : tareas.filter((t) => t.estado === filtro);

  const completar = useCallback((id) => {
    setTareas(
      tareas.map((t) =>
        t.id === id ? { ...t, estado: "Completada" } : t
      )
    );
  }, [tareas, setTareas]);

  const eliminar = useCallback((id) => {
    setTareas(tareas.filter((t) => t.id !== id));
  }, [tareas, setTareas]);

  const total = tareas.length;
  const completadas = tareas.filter((t) => t.estado === "Completada").length;
  const pendientes = tareas.filter((t) => t.estado === "Pendiente").length;
  const enProgreso = tareas.filter((t) => t.estado === "En progreso").length;

  return (
    <div className="tareas-page">
      <div className="tareas-header">
        <div>
          <h1 className="tareas-titulo">Mis Tareas</h1>
          <p className="tareas-subtitulo">
            {total} tarea{total !== 1 ? "s" : ""} en total
          </p>
        </div>
        <button className="btn-volver" onClick={() => navigate("/")}>
          ← Ir al inicio
        </button>
      </div>

      <div className="tareas-stats">
        <div className="stat-card stat-total">
          <span className="stat-num">{total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-card stat-pendiente">
          <span className="stat-num">{pendientes}</span>
          <span className="stat-label">Pendientes</span>
        </div>
        <div className="stat-card stat-progreso">
          <span className="stat-num">{enProgreso}</span>
          <span className="stat-label">En progreso</span>
        </div>
        <div className="stat-card stat-completada">
          <span className="stat-num">{completadas}</span>
          <span className="stat-label">Completadas</span>
        </div>
      </div>

      <div className="tareas-filtros">
        {FILTROS.map((f) => (
          <button
            key={f}
            className={`filtro-btn${filtro === f ? " filtro-btn--activo" : ""}`}
            onClick={() => setFiltro(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {tareasFiltradas.length === 0 ? (
        <div className="tareas-empty">
          <p className="tareas-empty-icon">📋</p>
          <p className="tareas-empty-texto">
            {filtro === "Todas"
              ? "No hay tareas aún. ¡Agrega una desde el inicio!"
              : `No hay tareas con estado "${filtro}".`}
          </p>
        </div>
      ) : (
        <ul className="tareas-lista">
          {tareasFiltradas.map((tarea) => (
            <TarjetaTarea
              key={tarea.id}
              id={tarea.id}
              titulo={tarea.titulo}
              estado={tarea.estado}
              onCompletar={completar}
              onEliminar={eliminar}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TareasPage;
