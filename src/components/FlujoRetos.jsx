import React from "react";
import { useNavigate } from "react-router-dom";

const FlujoRetos = ({ modulo, colores }) => {
  const navigate = useNavigate();

  // Rutas dinámicas según el módulo actual
  const rutas = {
    info: `/${modulo}-info`,
    datos: `/${modulo}-datos`,
    preguntas: `/${modulo}-preguntas`,
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "50px",
        flexWrap: "wrap",
        marginTop: "40px",
      }}
    >
      {/* 🔵 Círculo 1 – Lo que debes saber */}
      <div
        style={{
          ...estiloCirculo3D(colores[0]),
        }}
        onClick={() => navigate(rutas.info)}
      >
        <h5 style={estiloTexto}>Lo que debes saber</h5>
      </div>

      {/* Línea de conexión  */}
      <div style={estiloConector}></div>

      {/* 🟢 Círculo 2 – Datos curiosos */}
      <div
        style={{
          ...estiloCirculo3D(colores[1]),
        }}
        onClick={() => navigate(rutas.datos)}
      >
        <h5 style={estiloTexto}>Datos curiosos</h5>
      </div>

      {/* Línea de conexión */}
      <div style={estiloConector}></div>

      {/* 🟣 Círculo 3 – Preguntas */}
      <div
        style={{
          ...estiloCirculo3D(colores[2]),
        }}
        onClick={() => navigate(rutas.preguntas)}
      >
        <h5 style={estiloTexto}>Preguntas</h5>
      </div>
    </div>
  );
};

export default FlujoRetos;

// ------------------ ESTILOS -------------------

const estiloCirculo3D = (color) => ({
  width: "160px",
  height: "160px",
  borderRadius: "50%",
  background: `radial-gradient(circle at 30% 30%, ${color}, #00000099)`,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",

  // Efecto 3D gamer
  boxShadow: `
      0 4px 10px rgba(0,0,0,0.4),
      0 8px 20px ${color}55,
      inset 0 -5px 10px rgba(0,0,0,0.4),
      inset 0 3px 8px ${color}88
  `,

  transition: "transform 0.25s ease, box-shadow 0.25s ease",
  textAlign: "center",
  padding: "15px",
  color: "white",
  fontWeight: "700",
  userSelect: "none",

  // Hover: efecto de elevación 3D
  onMouseOver: "",
});

const estiloTexto = {
  color: "white",
  fontWeight: "700",
  fontSize: "1rem",
};

const estiloConector = {
  width: "60px",
  height: "6px",
  borderRadius: "5px",
  background:
    "linear-gradient(90deg, #2F7AD9aa, #52E36Aaa)", // igual que el header
};

