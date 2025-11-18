// 📌 src/context/MonedasContext.jsx
// Manejo global de monedas + temas pagados + temas completados.
// Lista para conectarse a backend cuando esté disponible.

import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";      // ← Backend (marcado donde se usa)
import { useUsuario } from "./UsuarioContext";

const MonedasContext = createContext();
export const useMonedas = () => useContext(MonedasContext);

export const MonedasProvider = ({ children }) => {

  const { usuario } = useUsuario();

  // -------------------------------------------------------
  // 1. ESTADO DE MONEDAS
  // -------------------------------------------------------
  const [monedas, setMonedas] = useState(() => {
    const guardado = localStorage.getItem("monedas");
    return guardado ? parseInt(guardado) : 0;
  });

  useEffect(() => {
    localStorage.setItem("monedas", monedas);
  }, [monedas]);


  // -------------------------------------------------------
  // 2. TEMAS PAGADOS (para bloquear/desbloquear)
  // -------------------------------------------------------
  const [temasPagados, setTemasPagados] = useState(() => {
    const guardado = localStorage.getItem("temasPagados");
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    localStorage.setItem("temasPagados", JSON.stringify(temasPagados));
  }, [temasPagados]);


  // -------------------------------------------------------
  // 3. TEMAS COMPLETADOS (para marcar con ✔ en layout y home)
  // -------------------------------------------------------
  const [temasCompletados, setTemasCompletados] = useState(() => {
    const guardado = localStorage.getItem("temasCompletados");
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    localStorage.setItem("temasCompletados", JSON.stringify(temasCompletados));
  }, [temasCompletados]);


  // -------------------------------------------------------
  // 4. CARGAR MONEDAS DESDE BACKEND (cuando esté)
  // -------------------------------------------------------
  const cargarMonedas = async () => {
    if (!usuario) return;

    try {
      /*
      const res = await api.get(`/perfil/${usuario.id_usuario}/`);
      setMonedas(res.data.monedas);
      */
    } catch (e) {
      console.error("Error cargando monedas:", e);
    }
  };


  // -------------------------------------------------------
  // 5. SUMAR MONEDAS
  // -------------------------------------------------------
  const ganarMonedas = async (cantidad) => {
    const nueva = monedas + cantidad;
    setMonedas(nueva);

    try {
      /*
      await api.patch(`/perfil/${usuario.id_perfil}/`, { monedas: nueva });
      */
    } catch (e) {
      console.error("Error al sumar monedas:", e);
    }
  };


  // -------------------------------------------------------
  // 6. GASTAR MONEDAS
  // -------------------------------------------------------
  const gastarMonedas = async (cantidad) => {
    if (monedas < cantidad) return false;

    const nueva = monedas - cantidad;
    setMonedas(nueva);

    try {
      /*
      await api.patch(`/perfil/${usuario.id_perfil}/`, { monedas: nueva });
      */
    } catch (e) {
      console.error("Error al gastar monedas:", e);
    }

    return true;
  };


  // -------------------------------------------------------
  // 7. PAGAR TEMA (solo 1 vez por tema)
  // -------------------------------------------------------
  const pagarTema = async (idTema, costo) => {
    if (temasPagados.includes(idTema)) return true;

    if (!(await gastarMonedas(costo))) return false;

    const nuevos = [...temasPagados, idTema];
    setTemasPagados(nuevos);

    try {
      /*
      await api.post("/tema/pagado/", {
        id_usuario: usuario.id_usuario,
        id_tema: idTema
      });
      */
    } catch (e) {
      console.error("Error al registrar pago del tema:", e);
    }

    return true;
  };


  // -------------------------------------------------------
  // 8. MARCAR TEMA COMO COMPLETADO (TemaCompletado.jsx)
  // -------------------------------------------------------
  const marcarTemaCompletado = (idTema) => {
    if (!temasCompletados.includes(idTema)) {
      setTemasCompletados([...temasCompletados, idTema]);
    }
  };


  return (
    <MonedasContext.Provider
      value={{
        monedas,
        ganarMonedas,
        gastarMonedas,
        cargarMonedas,
        pagarTema,
        temasPagados,
        temasCompletados,
        marcarTemaCompletado
      }}
    >
      {children}
    </MonedasContext.Provider>
  );
};
