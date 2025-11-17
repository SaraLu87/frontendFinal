// src/pages/temas/components/TarjetaDato.jsx
import "../temas.css";

const TarjetaDato = ({ titulo, descripcion }) => {
  return (
    <div className="tarjeta-dato">
      <h4>{titulo}</h4>
      <p>{descripcion}</p>
    </div>
  );
};

export default TarjetaDato;
