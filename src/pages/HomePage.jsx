import { useState, useEffect, useCallback } from "react";
import FormularioTarea from "../components/FormularioTarea";
import Buscador from "../components/Buscador";
import TarjetaTarea from "../components/TarjetaTarea";
import useLocalStorage from "../hooks/useLocalStorage";
import useDebounce from "../hooks/useDebounce";
import useFetch from "../hooks/useFetch";
import { useMemo } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/todos?_limit=10";

function HomePage() {

  const [tareas, setTareas] = useLocalStorage("TasksFlow", []);

  const [busqueda, setBusqueda] = useState("");
  const busquedaDebounced = useDebounce(busqueda, 500);

  const { datos, cargando, error } = useFetch(API_URL);

  useEffect(() => {
    if (datos && datos.length > 0 && tareas.length === 0) {
      const tareasApi = datos.map((t) => ({
        id: t.id,
        titulo: t.title,
        estado: t.completed ? "Completada" : "Pendiente",
      }));
      setTareas(tareasApi);
    }
  }, [datos]);

  function agregar(titulo) {
    setTareas([...tareas, { id: Date.now(), titulo, estado: "Pendiente" }]);
  }

  const eliminar = useCallback((id) => {
    setTareas((TareasPrev) => TareasPrev.filter((t) => t.id !== id));
  }, []);

  const completar = useCallback((id) => {
    setTareas(
      tareas.map((t) => (t.id === id ? { ...t, estado: "Completada" } : t)),
    );
  }, [tareas]);
  
  const tareasFiltradas = useMemo(() => {
    return tareas.filter((t) =>
      t.titulo.toLowerCase().includes(busquedaDebounced.toLowerCase()),
    );
  }, [tareas, busquedaDebounced]);

  const pendientes = useMemo(() => {
    return tareas.filter((t) => t.estado === "Pendiente").length;
  }, [tareas]);

  const completadas = useMemo(() => {
    return tareas.filter((t) => t.estado === "Completada").length;
  }, [tareas]);

  if (cargando) return <p>Cargando tareas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-brand">
          <span className="header-logo">✓</span>
          <h1 className="header-title">TaskFlow</h1>
        </div>
        <p className="header-subtitle">Gestor de tareas del equipo</p>
      </header>

      <main className="app-main">
        <FormularioTarea onAgregar={agregar} />
        <Buscador onBuscar={setBusqueda} />

        {tareas.length > 0 && (
          <div className="stats-row">
            <div className="stat">
              <span className="stat-number">{tareas.length}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat">
              <span className="stat-number pendiente">{pendientes}</span>
              <span className="stat-label">Pendientes</span>
            </div>
            <div className="stat">
              <span className="stat-number completada">{completadas}</span>
              <span className="stat-label">Completadas</span>
            </div>
          </div>
        )}

        <ul className="tareas-lista">
          {tareas.length === 0 ? (
            <li className="tareas-vacio">
              <span className="vacio-icon">📋</span>
              <p>No hay tareas aún. ¡Agrega la primera!</p>
            </li>
          ) : (
            tareasFiltradas.map((t) => (
              <TarjetaTarea
                key={t.id}
                id={t.id}
                titulo={t.titulo}
                estado={t.estado}
                onEliminar={eliminar}
                onCompletar={completar}
              />
            ))
          )}
        </ul>
      </main>
    </div>
  );
}

export default HomePage;
