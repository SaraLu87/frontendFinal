// src/context/ProgresoContext.jsx

import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import { useUsuario } from "./UsuarioContext";

const ProgresoContext = createContext();

export const useProgreso = () => useContext(ProgresoContext);

export const ProgresoProvider = ({ children }) => {
  const { usuario } = useUsuario();

  const [progreso, setProgreso] = useState({
    ahorro: 0,
    inversion: 0,
    presupuesto: 0,
    seguridad: 0,
  });

  const [loading, setLoading] = useState(true);

  // --- 1. Cargar progreso de la BD (o mock) ---
  const cargarProgreso = async () => {
    if (!usuario) {
      setLoading(false);
      return;
    }

    try {
      /*
        const res = await api.get(`/progresos/${usuario.id}/`);
        setProgreso(res.data);
      */

      // --- DATOS TEMPORALES ---
      setProgreso({
        ahorro: 0,
        inversion: 0,
        presupuesto: 0,
        seguridad: 0,
      });

    } catch (error) {
      console.error("Error al obtener progreso:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProgreso();
  }, [usuario]);

  // --- 2. Actualizar un módulo ---
  const actualizarProgreso = async (modulo, valor) => {
    const nuevo = { ...progreso, [modulo]: valor };
    setProgreso(nuevo);

    try {
      /*
        await api.patch(`/progresos/${usuario.id}/`, {
          [modulo]: valor,
        });
      */
    } catch (error) {
      console.error("Error al actualizar progreso:", error);
    }
  };

  return (
    <ProgresoContext.Provider
      value={{
        progreso,
        loading,
        actualizarProgreso,
      }}
    >
      {children}
    </ProgresoContext.Provider>
  );
};
