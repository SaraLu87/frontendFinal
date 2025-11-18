// 📌 src/context/ProgresoContext.jsx
// Guarda el avance del usuario dentro de cada tema.
// Registrar: info, datos, preguntas, tema finalizado.

import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api"; // ← backend luego

const ProgresoContext = createContext();
export const useProgreso = () => useContext(ProgresoContext);

export const ProgresoProvider = ({ children }) => {
  
  // -------------------------------------------------------
  // 1. PROGRESO COMPLETO POR TEMA
  // {
  //    1: { info: true, datos: true, preguntas: false, finalizado: false },
  //    2: {...}
  // }
  // -------------------------------------------------------
  const [progresoTemas, setProgresoTemas] = useState(() => {
    const guardado = localStorage.getItem("progresoTemas");
    return guardado ? JSON.parse(guardado) : {};
  });

  useEffect(() => {
    localStorage.setItem("progresoTemas", JSON.stringify(progresoTemas));
  }, [progresoTemas]);


  // -------------------------------------------------------
  // 2. ACTUALIZAR UNA SECCIÓN DEL TEMA:
  // sección = "info" | "datos" | "preguntas"
  // -------------------------------------------------------
  const actualizarProgreso = (idTema, seccion) => {
    setProgresoTemas((prev) => ({
      ...prev,
      [idTema]: {
        ...prev[idTema],
        [seccion]: true,
      },
    }));
  };


  // -------------------------------------------------------
  // 3. MARCAR TEMA COMPLETO (TemaCompletado.jsx)
  // -------------------------------------------------------
  const registrarTemaFinalizado = (idTema) => {
    setProgresoTemas((prev) => ({
      ...prev,
      [idTema]: {
        ...prev[idTema],
        finalizado: true,
      },
    }));

    try {
      /*
      await api.post("/progreso/tema-finalizado/", {
        id_tema: idTema,
        fecha: new Date().toISOString()
      });
      */
    } catch (e) {
      console.error("Error guardando finalización:", e);
    }
  };


  return (
    <ProgresoContext.Provider
      value={{
        progresoTemas,
        actualizarProgreso,
        registrarTemaFinalizado
      }}
    >
      {children}
    </ProgresoContext.Provider>
  );
};
