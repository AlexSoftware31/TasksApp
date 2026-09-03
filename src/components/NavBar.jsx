import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <span className="logo">
        <span className="logo-icon">✓</span>
        TaskFlow
      </span>
      <div className="nav-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-link activo" : "nav-link"
          }
        >
          Inicio
        </NavLink>
        <NavLink
          to="/tareas"
          className={({ isActive }) =>
            isActive ? "nav-link activo" : "nav-link"
          }
        >
          Tareas
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
