import { useNavigate } from "react-router-dom";
import "./Pagina404.css";

function Pagina404() {
  const navigate = useNavigate();

  return (
    <div className="pagina404">
      <div className="pagina404-card">
        <div className="pagina404-numero">404</div>
        <h1 className="pagina404-titulo">Página no encontrada</h1>
        <p className="pagina404-descripcion">
          Lo sentimos, la página que estás buscando no existe o fue movida.
        </p>
        <div className="pagina404-acciones">
          <button
            className="pagina404-btn pagina404-btn--primary"
            onClick={() => navigate("/")}
          >
            Ir al inicio
          </button>
          <button
            className="pagina404-btn pagina404-btn--ghost"
            onClick={() => navigate(-1)}
          >
            ← Volver
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagina404;
