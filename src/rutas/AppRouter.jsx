import { BrowserRouter, Routes, Route } from "react-router-dom";

// Páginas públicas
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Página principal
import Home from "../pages/home/Home";

// Temas
import TemaLayout from "../pages/temas/TemaLayout";
import TemaInfo from "../pages/temas/TemaInfo";
import TemaDatos from "../pages/temas/TemaDatos";
import TemaPreguntas from "../pages/temas/TemaPreguntas";
import TemaCompletado from "../pages/temas/TemaCompletado";
import HomeTemas from "../pages/home/HomeTemas";
import { useTemas } from "../context/TemasContext";



// Perfil
import PerfilUsuario from "../pages/perfil/PerfilUsuario";

// 404
import NotFound from "../pages/NotFound";

// Rutas protegidas
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* RUTAS PÚBLICAS */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* RUTAS PRIVADAS */}
        <Route path="/" element={<PrivateRoute><HomeTemas /></PrivateRoute>} />

        {/* <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        /> */}

        <Route
          path="/tema/:id"
          element={
            <PrivateRoute>
              <TemaLayout />
            </PrivateRoute>
          }
        />

        <Route
          path="/tema/:id/info"
          element={
            <PrivateRoute>
              <TemaInfo />
            </PrivateRoute>
          }
        />

        <Route
          path="/tema/:id/datos"
          element={
            <PrivateRoute>
              <TemaDatos />
            </PrivateRoute>
          }
        />

        <Route
          path="/tema/:id/preguntas"
          element={
            <PrivateRoute>
              <TemaPreguntas />
            </PrivateRoute>
          }
        />

        <Route
          path="/tema/:id/completado"
          element={
            <PrivateRoute>
              <TemaCompletado />
            </PrivateRoute>
          }
        />

        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <PerfilUsuario />
            </PrivateRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
