import React from "react";

const CardInfo = ({ titulo, texto, imagen, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        background: "white",
        borderRadius: "18px",
        padding: "25px",
        textAlign: "center",
        cursor: onClick ? "pointer" : "default",

        // Borde cromado gamer (azul → verde → morado)
        border: "4px solid",
        borderImage:
          "linear-gradient(135deg, #2F7AD9, #52E36A, #8A4FFF) 1",

        // Sombra neon suave
        boxShadow: "0 6px 18px rgba(0,0,0,0.15)",

        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.25)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.15)";
      }}
    >
      {/* Imagen opcional */}
      {imagen && (
        <img
          src={imagen}
          alt={titulo}
          style={{
            width: "90px",
            height: "90px",
            objectFit: "contain",
            marginBottom: "15px",
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
          }}
        />
      )}

      {/* Título */}
      <h4
        style={{
          fontWeight: "700",
          color: "#1C3A63",
          marginBottom: "12px",
        }}
      >
        {titulo}
      </h4>

      {/* Texto */}
      <p style={{ color: "#444", lineHeight: "1.4" }}>{texto}</p>
    </div>
  );
};

export default CardInfo;
