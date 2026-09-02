import { useState, useEffect } from "react";

function useFetch(url) {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    let cancelado = false;
    const cargar = async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        if (!cancelado) setDatos(json);
      } catch (e) {
        if (!cancelado) setError(e.message);
      } finally {
        if (!cancelado) setCargando(false);
      }
    };
    cargar();
    return () => {
      cancelado = true;
    };
  }, [url]);

  return { datos, cargando, error };
}

export default useFetch;
