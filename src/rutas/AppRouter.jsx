// src/rutas/AppRouter.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Páginas de autenticación
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Recover from "../pages/auth/Recover";

// Página principal
import Home from "../pages/home/Home";

// Temas dinámicos
import TemaLayout from "../pages/temas/TemaLayout";
import TemaInfo from "../pages/temas/TemaInfo";
import TemaDatos from "../pages/temas/TemaDatos";
import TemaPreguntas from "../pages/temas/TemaPreguntas";

// Perfil usuario
import PerfilUsuario from "../pages/perfil/PerfilUsuario";

// Panel administrador
import PerfilAdministrador from "../pages/perfil/PerfilAdministrador";
import TemaCompletado from "../pages/temas/TemaCompletado.jsx";

// 404
import NotFound from "../pages/NotFound";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recover" element={<Recover />} />

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* TEMAS DINÁMICOS */}
        <Route path="/tema/:id" element={<TemaLayout />} />
        <Route path="/tema/:id/info" element={<TemaInfo />} />
        <Route path="/tema/:id/datos" element={<TemaDatos />} />
        <Route path="/tema/:id/preguntas" element={<TemaPreguntas />} />
        <Route path="/tema/:id/completado" element={<TemaCompletado />} />
        
        {/* PERFILES */}
        <Route path="/perfil" element={<PerfilUsuario />} />
        <Route path="/admin" element={<PerfilAdministrador />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
