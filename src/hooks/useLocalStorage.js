import { useState } from "react";

function useLocalStorage(clave, valorInicial) {
  const [valor, setValor] = useState(() => {

    try {
      const guardado = localStorage.getItem(clave);
      return guardado != null ? JSON.parse(guardado) : valorInicial;
    } catch {
      return valorInicial;
    }
  });


  const guardar = (nuevoValor) => {
    try {
      localStorage.setItem(clave, JSON.stringify(nuevoValor));
      setValor(nuevoValor);
    } catch {}
  };
  return [valor, guardar];

}

export default useLocalStorage;