import { useState, useEffect } from "react";

function useDebounce(valor, delay = 500) {
  const [debounced, setDebounced] = useState(valor);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(valor), delay);
    return () => clearTimeout(timer);
  }, [valor, delay]);

  return debounced;
}

export default useDebounce;
