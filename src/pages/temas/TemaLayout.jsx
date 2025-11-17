// src/pages/temas/TemaLayout.jsx

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";

import CirculoReto from "./components/CirculoReto";
import "../../styles/global.css";
import "./temas.css";

import { useMonedas } from "../../context/MonedasContext";

// 🟢 COSTOS Y RECOMPENSAS (mock + listo para conectarse a BD)
const TEMAS_CONFIG = {
  1: { precio: 0, recompensa: 250 },
  2: { precio: 200, recompensa: 400 },
  3: { precio: 200, recompensa: 350 },
  4: { precio: 400, recompensa: 10000 },
};

const TemaLayout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const temaId = Number(id);

  const { monedas, gastarMonedas } = useMonedas();

  // Marca si este tema ya fue pagado
  const [temaPagado, setTemaPagado] = useState(false);

  const tema = TEMAS_CONFIG[temaId];

  useEffect(() => {
    /*
      CUANDO BACKEND ESTÉ LISTO:
      api.get(`/perfil/${usuario.id_perfil}/tema/${temaId}/estado`)
         .then(res => setTemaPagado(res.data.pagado))
    */
    // Por ahora todos vienen sin pagar excepto Tema 1
    setTemaPagado(temaId === 1);
  }, [temaId]);

  const pagarTema = () => {
    if (monedas < tema.precio) {
      alert("No tienes suficientes monedas para este tema.");
      return;
    }

    gastarMonedas(tema.precio);
    setTemaPagado(true);

    /*
      CUANDO HAYA BACKEND:
      await api.post(`/temas/${temaId}/pagar`, {
         id_perfil: usuario.id_perfil
      });
    */
  };

  return (
    <>
      <Header />

      <div className="tema-layout-container">
        <h1 className="tema-title">Tema {temaId}</h1>
        <p className="tema-subtitle">Completa cada parte del reto</p>

        {/* SI EL TEMA NO HA SIDO PAGADO */}
        {!temaPagado && (
          <div className="tema-bloqueado-card">
            <h3>🔒 Tema bloqueado</h3>
            <p>
              Este tema cuesta <strong>{tema.precio} monedas</strong>.
            </p>

            <button className="btn-comprar" onClick={pagarTema}>
              Pagar y desbloquear
            </button>

            <button
              className="btn-volver-inicio"
              onClick={() => navigate("/")}
            >
              Volver al inicio
            </button>
          </div>
        )}

        {/* SI EL TEMA YA ESTÁ PAGADO → MOSTRAR LOS CÍRCULOS */}
        {temaPagado && (
          <div className="tema-circulos-container">
            <CirculoReto
              titulo="Lo que debes saber"
              color="azul"
              onClick={() => navigate(`/tema/${id}/info`)}
            />

            <CirculoReto
              titulo="Datos curiosos"
              color="verde"
              onClick={() => navigate(`/tema/${id}/datos`)}
            />

            <CirculoReto
              titulo="Preguntas"
              color="morado"
              onClick={() => navigate(`/tema/${id}/preguntas`)}
            />
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default TemaLayout;
