// src/context/TemaContext.jsx

import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const TemaContext = createContext();

// Hook para usar el contexto
export const useTemas = () => useContext(TemaContext);

export const TemaProvider = ({ children }) => {
  // 1. Estado global de los temas
  const [temas, setTemas] = useState(() => {
    const guardado = localStorage.getItem("temas");
    return guardado ? JSON.parse(guardado) : [];
  });

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  // 2. Guardar temas en localStorage al cambiar
  useEffect(() => {
    if (temas.length > 0) {
      localStorage.setItem("temas", JSON.stringify(temas));
    }
  }, [temas]);

  // 3. Obtener temas desde el backend
  const getTemas = async () => {
    setCargando(true);
    setError(null);
    try {
      const res = await api.get("/temas/");
      setTemas(res.data);
    } catch (err) {
      console.error("Error obteniendo temas:", err);
      setError("No se pudieron cargar los temas");
    } finally {
      setCargando(false);
    }

    // const getTemaById = async (id_tema) => {
    //     setCargando(true);
    //     setError(null);
    //     try {
    //     const res = await api.get(`/temas/${id_tema}/`);
    //     return res.data; // 👈 devuelve el tema directamente
    //     } catch (err) {
    //     console.error("Error obteniendo tema:", err);
    //     setError("No se pudo cargar el tema");
    //     return null;
    //     } finally {
    //     setCargando(false);
    //     }
    // }
  };

  

  // 4. Valores disponibles para toda la app
  return (
    <TemaContext.Provider value={{ temas, getTemas, cargando, error }}>
      {children}
    </TemaContext.Provider>
  );
};
