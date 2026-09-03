import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TareasPage from "./pages/TareasPage";
import DetallePage from "./pages/DetallePage";
import Pagina404 from "./pages/Pagina404";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tareas" element={<TareasPage />} />
        <Route path="/tareas/:id" element={<DetallePage />} />
        <Route path="*" element={<Pagina404 />} />
      </Routes>
    </>
  );
}

export default App;
