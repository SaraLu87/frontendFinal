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

  // 1. Cargar progreso desde el backend
  const cargarProgreso = async () => {
    if (!usuario) return;

    try {
      const res = await api.get(`/progresos/${usuario.id}/`);
      setProgreso(res.data);
    } catch (error) {
      console.error("Error al obtener progreso:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProgreso();
  }, [usuario]);

  // 2. Actualizar progreso en BD
  const actualizarProgreso = async (modulo, valor) => {
    try {
      const nuevoProgreso = { ...progreso, [modulo]: valor };
      setProgreso(nuevoProgreso);

      await api.patch(`/progresos/${usuario.id}/`, {
        [modulo]: valor,
      });
    } catch (error) {
      console.error("Error al actualizar progreso:", error);
    }
  };

  // 3. Obtener progreso de un módulo
  const obtenerProgreso = (modulo) => progreso[modulo] ?? 0;

  return (
    <ProgresoContext.Provider
      value={{
        progreso,
        loading,
        cargarProgreso,
        actualizarProgreso,
        obtenerProgreso,
      }}
    >
      {children}
    </ProgresoContext.Provider>
  );
};
