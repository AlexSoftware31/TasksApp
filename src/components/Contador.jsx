import { useState } from "react";

function Contador() {

  const [cuenta, setCuenta] = useState(0);
  const [nombre, setNombre] = useState("");

  

  const resta = () => {
    setCuenta(cuenta - 1);
  };

  function sumar(){
    setCuenta(cuenta + 1);
  }

  return (
    <div>
      <p>Cuenta: {cuenta}</p>
      <p>{nombre}</p>

      <input value={nombre} onChange={e => setNombre(e.target.value)}/>

      <button onClick={sumar}>+1</button>
      <button onClick={resta}>-1</button>
      <button onClick={() => setNombre("CaRLOS")} > Cambiar</button>

    </div>
  );
}

export default Contador;
