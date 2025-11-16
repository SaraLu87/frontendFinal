import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/axiosConfig"; // nuestra instancia axios
import { useUsuario } from "./UsuarioContext";

// Crear contexto
const MonedasContext = createContext();

// Hook para usar el contexto
export const useMonedas = () => useContext(MonedasContext);

export const MonedasProvider = ({ children }) => {
  const { usuario } = useUsuario(); // obtenemos el usuario logueado
  const [monedas, setMonedas] = useState(0);
  const [loading, setLoading] = useState(true);

  // 1. Obtener monedas desde backend
  const cargarMonedas = async () => {
    if (!usuario) return;

    try {
      const response = await api.get(`/usuarios/${usuario.id}/monedas/`);
      setMonedas(response.data.monedas);
    } catch (error) {
      console.error("Error al cargar monedas:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Ejecutar al iniciar sesión o actualizar usuario
  useEffect(() => {
    cargarMonedas();
  }, [usuario]);

  // 3. Sumar monedas (y guardar)
  const ganarMonedas = async (cantidad) => {
    try {
      const nuevaCantidad = monedas + cantidad;
      setMonedas(nuevaCantidad);

      await api.patch(`/usuarios/${usuario.id}/monedas/`, {
        monedas: nuevaCantidad,
      });
    } catch (error) {
      console.error("Error al agregar monedas:", error);
    }
  };

  //  4. Gastar monedas
  const gastarMonedas = async (cantidad) => {
    if (monedas < cantidad) return alert("No tienes suficientes monedas");

    try {
      const nuevaCantidad = monedas - cantidad;
      setMonedas(nuevaCantidad);

      await api.patch(`/usuarios/${usuario.id}/monedas/`, {
        monedas: nuevaCantidad,
      });
    } catch (error) {
      console.error("Error al gastar monedas:", error);
    }
  };

  return (
    <MonedasContext.Provider
      value={{
        monedas,
        loading,
        ganarMonedas,
        gastarMonedas,
        cargarMonedas,
      }}
    >
      {children}
    </MonedasContext.Provider>
  );
};
