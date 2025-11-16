import { createContext, useState, useEffect } from "react";
import axios from "../services/axiosConfig";

// Crear el contexto
export const UsuarioContext = createContext();

// Proveedor del contexto
export function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [cargando, setCargando] = useState(true);

  // Si hay token, cargar datos del usuario
  useEffect(() => {
    async function cargarUsuario() {
      if (!token) {
        setCargando(false);
        return;
      }
      try {
        const res = await axios.get("/usuario/", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsuario(res.data);
      } catch (err) {
        console.error("Error cargando usuario:", err);
        cerrarSesion();
      }
      setCargando(false);
    }
    cargarUsuario();
  }, [token]);

  // LOGIN
  async function iniciarSesion(email, password) {
    try {
      const res = await axios.post("/token/", { email, password });
      localStorage.setItem("token", res.data.access);
      setToken(res.data.access);
      return { ok: true };
    } catch (error) {
      return { ok: false, mensaje: "Credenciales incorrectas" };
    }
  }

  // LOGOUT
  function cerrarSesion() {
    localStorage.removeItem("token");
    setToken(null);
    setUsuario(null);
  }

  return (
    <UsuarioContext.Provider
      value={{
        usuario,
        token,
        iniciando: cargando,
        iniciarSesion,
        cerrarSesion,
        autenticado: !!usuario
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}
