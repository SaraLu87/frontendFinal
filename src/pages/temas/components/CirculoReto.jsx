// src/pages/temas/components/CirculoReto.jsx

import "../temas.css"; // ⬅ importante: importa el archivo correcto

const CirculoReto = ({ titulo, color, onClick }) => {
  return (
    <div className={`circulo-reto circulo-${color}`} onClick={onClick}>
      <h5>{titulo}</h5>
    </div>
  );
};

export default CirculoReto;
