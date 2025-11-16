// src/context/UsuarioContext.jsx

import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

// Crear contexto
const UsuarioContext = createContext();

// Hook para usarlo
export const useUsuario = () => useContext(UsuarioContext);

export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem("usuario");
    if (stored) setUsuario(JSON.parse(stored));
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    /*
      ⚠️ CUANDO BACKEND ESTÉ LISTO CAMBIAR POR:

      const res = await api.post("/auth/login/", { email, password });
      setUsuario(res.data.user);
      localStorage.setItem("usuario", JSON.stringify(res.data.user));
    */

    // Datos simulados
    const fakeUser = { id: 1, nombre: "Sara", email };
    setUsuario(fakeUser);
    localStorage.setItem("usuario", JSON.stringify(fakeUser));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  return (
    <UsuarioContext.Provider value={{ usuario, login, logout, loading }}>
      {children}
    </UsuarioContext.Provider>
  );
};
