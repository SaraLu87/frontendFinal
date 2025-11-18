// src/rutas/AdminRoute.jsx

//  PROTEGE RUTAS SOLO PARA ADMINISTRADORES
//  Si no redirige al Home

import { Navigate } from "react-router-dom";
import { useUsuario } from "../context/UsuarioContext";

const AdminRoute = ({ children }) => {
  const { usuario } = useUsuario();

  // ❗ Recuerda que en backend el campo es → rol: "Usuario" | "Administrador"
  if (!usuario || usuario.rol !== "Administrador") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
