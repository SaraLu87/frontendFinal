// src/context/MonedasContext.jsx

import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import { useUsuario } from "./UsuarioContext";

const MonedasContext = createContext();

export const useMonedas = () => useContext(MonedasContext);

export const MonedasProvider = ({ children }) => {
  const { usuario } = useUsuario();
  const [monedas, setMonedas] = useState(0);
  const [loading, setLoading] = useState(true);

  // --- 1. Cargar monedas ---
  const cargarMonedas = async () => {
    if (!usuario) {
      setLoading(false);
      return;
    }

    try {
      /*
        CUANDO BACKEND ESTÉ LISTO:
        const res = await api.get(`/usuarios/${usuario.id}/monedas/`);
        setMonedas(res.data.monedas);
      */

      // --- MODO SIN BACKEND ---
      const mock = 120;
      setMonedas(mock);

    } catch (error) {
      console.error("Error al cargar monedas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarMonedas();
  }, [usuario]);

  // --- 2. Sumar monedas ---
  const ganarMonedas = async (cantidad) => {
    const nueva = monedas + cantidad;
    setMonedas(nueva);

    try {
      /*
        await api.patch(`/usuarios/${usuario.id}/monedas/`, {
          monedas: nueva,
        });
      */
    } catch (e) {
      console.error(e);
    }
  };

  // --- 3. Gastar monedas ---
  const gastarMonedas = async (cantidad) => {
    if (monedas < cantidad) {
      alert("No tienes suficientes monedas");
      return;
    }

    const nueva = monedas - cantidad;
    setMonedas(nueva);

    try {
      /*
        await api.patch(`/usuarios/${usuario.id}/monedas/`, {
          monedas: nueva,
        });
      */
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <MonedasContext.Provider
      value={{
        monedas,
        loading,
        cargarMonedas,
        ganarMonedas,
        gastarMonedas,
      }}
    >
      {children}
    </MonedasContext.Provider>
  );
};
