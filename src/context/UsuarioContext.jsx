// src/context/UsuarioContext.jsx

//  CONTEXTO DE USUARIO
//  Maneja login, logout y no borra datos al cerrar sesión

import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api"; //  Cuando el backend esté listo

const UsuarioContext = createContext();

// Hook para usar el contexto
export const useUsuario = () => useContext(UsuarioContext);

export const UsuarioProvider = ({ children }) => {

  // 1. ESTADO GLOBAL DEL USUARIO
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem("usuario");
    return guardado ? JSON.parse(guardado) : null;
  });

  // 2. GUARDAR USUARIO EN LOCALSTORAGE AL CAMBIAR
  
  useEffect(() => {
    if (usuario) {
      localStorage.setItem("usuario", JSON.stringify(usuario));
    }
  }, [usuario]);


  // 3. LOGIN (con backend)

  const login = async (correo, contrasena) => {
    try {
      // Llamada real al backend
      const res = await api.post("/login_usuario/", { correo, contrasena });

      // Guardar token en localStorage
      localStorage.setItem("token", res.data.token);

      // Guardar usuario en estado global
      setUsuario(res.data.usuario);

      return { ok: true };
      
    } catch (error) {
      console.error("Error en login:", error);
      return { ok: false, mensaje: "Credenciales incorrectas" };
    }
  };


  // 4. LOGOUT
  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };


  // 5. REGISTER (al conectar backend)
  const register = async (datos) => {
    try {
      /*
      const res = await api.post("/register/", datos);
      setUsuario(res.data.usuario);
      */

      return { ok: true };
    } catch (error) {
      console.error("Error al registrar:", error);
      return { ok: false, mensaje: "No se pudo registrar" };
    }
  };



  // 6. VALORES DISPONIBLES PARA TODA LA APP
  return (
    <UsuarioContext.Provider
      value={{
        usuario,
        login,
        logout,
        register,
        setUsuario,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};
