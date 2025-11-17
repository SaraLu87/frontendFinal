// src/context/MonedasContext.jsx

import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import { useUsuario } from "./UsuarioContext";
import { TEMAS_CONFIG } from "../constants/temas";   // ⬅ IMPORTANTE

const MonedasContext = createContext();
export const useMonedas = () => useContext(MonedasContext);

export const MonedasProvider = ({ children }) => {
  const { usuario } = useUsuario();

  // -----------------------------
  //  ESTADOS
  // -----------------------------
  const [monedas, setMonedas] = useState(0);
  const [loading, setLoading] = useState(true);

  // Temas que ya pagó → se guardan localmente
  const [temasPagados, setTemasPagados] = useState(() => {
    const guardado = localStorage.getItem("temasPagados");
    return guardado ? JSON.parse(guardado) : [];
  });

  // Temas completados (solo se suma una vez)
  const [temasCompletados, setTemasCompletados] = useState(() => {
    const guardado = localStorage.getItem("temasCompletados");
    return guardado ? JSON.parse(guardado) : [];
  });

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem("temasPagados", JSON.stringify(temasPagados));
  }, [temasPagados]);

  useEffect(() => {
    localStorage.setItem("temasCompletados", JSON.stringify(temasCompletados));
  }, [temasCompletados]);

  // -----------------------------
  // 1. CARGAR MONEDAS
  // -----------------------------
  const cargarMonedas = async () => {
    if (!usuario) {
      setLoading(false);
      return;
    }

    try {
      // MODO MOCK TEMPORAL
      const mock = 250;
      setMonedas(mock);

      /*
        CUANDO BACKEND ESTÉ LISTO:
        const res = await api.get(`/usuarios/${usuario.id}/monedas/`);
        setMonedas(res.data.monedas);
      */
    } catch (error) {
      console.error("Error al cargar monedas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarMonedas();
  }, [usuario]);

  // -----------------------------
  // 2. SUMAR MONEDAS
  // -----------------------------
  const ganarMonedas = async (cantidad) => {
    const nueva = monedas + cantidad;
    setMonedas(nueva);

    /*
      await api.patch(`/usuarios/${usuario.id}/monedas/`, {
        monedas: nueva,
      });
    */
  };

  // -----------------------------
  // 3. GASTAR MONEDAS
  // -----------------------------
  const gastarMonedas = async (cantidad) => {
    if (monedas < cantidad) {
      alert("❌ No tienes suficientes monedas");
      return false;
    }

    const nueva = monedas - cantidad;
    setMonedas(nueva);

    /*
      await api.patch(`/usuarios/${usuario.id}/monedas/`, {
        monedas: nueva,
      });
    */

    return true;
  };

  // -----------------------------
  // 4. PAGAR TEMA (SOLO 1 VEZ)
  // -----------------------------
  const pagarTema = async (idTema, costo) => {
    if (temasPagados.includes(idTema)) return true; // Ya pagado

    if (monedas < costo) {
      alert("❌ Monedas insuficientes");
      return false;
    }

    const nueva = monedas - costo;
    setMonedas(nueva);

    setTemasPagados([...temasPagados, idTema]);

    /*
      await api.post("/temas/pago/", {
        usuario: usuario.id,
        tema: idTema,
      });
    */

    return true;
  };

  // -----------------------------
  // 5. COMPLETAR TEMA
  // -----------------------------
  const completarTema = async (idTema) => {
    const tema = TEMAS_CONFIG.find((t) => t.id === idTema);
    if (!tema) return;

    // Ya estaba completado
    if (temasCompletados.includes(idTema)) return;

    // 1. Sumar recompensa
    const nueva = monedas + tema.recompensa;
    setMonedas(nueva);

    // 2. Guardar tema como completado
    setTemasCompletados([...temasCompletados, idTema]);

    // 3. Fecha
    const fecha = new Date().toISOString();
    console.log(`Tema ${idTema} completado: ${fecha}`);

    /*
      await api.post(`/progreso/tema-completo/`, {
        tema: idTema,
        fecha,
        monedas: nueva,
      });
    */

    return true;
  };

  // -----------------------------
  // PROVIDER
  // -----------------------------
  return (
    <MonedasContext.Provider
      value={{
        monedas,
        loading,
        ganarMonedas,
        gastarMonedas,
        cargarMonedas,
        pagarTema,
        completarTema,
        temasPagados,
        temasCompletados
      }}
    >
      {children}
    </MonedasContext.Provider>
  );
};
