import React from "react";

const BotonPrimario = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  fullWidth = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        background: disabled
          ? "gray"
          : "linear-gradient(90deg, #52E36A, #2F7AD9)", // verde → azul
        color: "white",
        border: "none",
        padding: "12px 28px",
        borderRadius: "50px", // Súper redondeado estilo Duolingo
        fontSize: "1rem",
        fontWeight: "700",
        cursor: disabled ? "not-allowed" : "pointer",
        width: fullWidth ? "100%" : "auto",
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        transition: "all 0.2s ease-in-out",
      }}
      onMouseOver={(e) => {
        if (!disabled) {
          e.target.style.transform = "scale(1.05)";
        }
      }}
      onMouseOut={(e) => {
        e.target.style.transform = "scale(1)";
      }}
    >
      {children}
    </button>
  );
};

export default BotonPrimario;
