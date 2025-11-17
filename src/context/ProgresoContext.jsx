import { createContext, useContext, useState, useEffect } from "react";

const ProgresoContext = createContext();
export const useProgreso = () => useContext(ProgresoContext);

export const ProgresoProvider = ({ children }) => {
  
  // Progreso guardado por tema:
  // {
  //   "1": { info: true, datos: false, preguntas: true }
  // }
  const [progresoTemas, setProgresoTemas] = useState(() => {
    const guardado = localStorage.getItem("progresoTemas");
    return guardado ? JSON.parse(guardado) : {};
  });

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem("progresoTemas", JSON.stringify(progresoTemas));
  }, [progresoTemas]);

  
  // ------------------------------------------
  // 1. Marcar una sección como completada
  // ------------------------------------------
  const completarSeccion = (temaId, seccion) => {
    setProgresoTemas(prev => ({
      ...prev,
      [temaId]: {
        ...prev[temaId],
        [seccion]: true,
      }
    }));
  };


  // ------------------------------------------
  // 2. Verificar si un tema ya está completado
  // ------------------------------------------
  const estaCompleto = (temaId) => {
    const t = progresoTemas[temaId];
    if (!t) return false;

    return t.info && t.datos && t.preguntas;
  };


  return (
    <ProgresoContext.Provider value={{
      progresoTemas,
      completarSeccion,
      estaCompleto,
    }}>
      {children}
    </ProgresoContext.Provider>
  );
};
