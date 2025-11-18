// src/rutas/PrivateRoute.jsx

//  PROTEGE RUTAS SOLO PARA USUARIOS LOGUEADOS
//  Si no  redirige a /login

import { Navigate } from "react-router-dom";
import { useUsuario } from "../context/UsuarioContext";

const PrivateRoute = ({ children }) => {
  const { usuario } = useUsuario();

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
