// src/pages/temas/TemaLayout.jsx

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Estilos globales y locales
import "../../styles/global.css";
import "./temas.css";

// Componentes generales
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";

// Componente reutilizable de círculo
import CirculoReto from "./components/CirculoReto";

const TemaLayout = () => {
  const { id } = useParams(); // 🆔 Captura el ID del tema desde la URL
  const navigate = useNavigate();

  const [tema, setTema] = useState(null);

  useEffect(() => {
    /*
    CUANDO EL BACKEND ESTE LISTO, ACTIVAR ESTO:

    api.get(`/temas/${id}/`)
      .then(res => setTema(res.data))
      .catch(err => console.error("Error cargando tema:", err));
    */

    // ----------------------------------
    // POR AHORA: Datos simulados
    // ----------------------------------
    const temasMock = {
      1: { nombre: "Ahorro Inteligente", color: "verde" },
      2: { nombre: "Presupuesto", color: "azul" },
      3: { nombre: "Inversión", color: "morado" },
      4: { nombre: "Seguridad Financiera", color: "amarillo" }
    };

    setTema(temasMock[id]);
  }, [id]);

  if (!tema) return null; // Evita errores antes de que cargue el tema

  return (
    <>
      <Header />

      <div className="tema-layout-container">
        {/* Título del tema */}
        <h1 className="tema-title">
          {tema.nombre}
        </h1>

        <p className="tema-subtitle">
          Completa cada parte del reto para ganar monedas y avanzar 💰
        </p>

        {/* Círculos */}
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
      </div>

      <Footer />
    </>
  );
};

export default TemaLayout;
