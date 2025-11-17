// src/pages/temas/components/PreguntaCard.jsx
import "../../temas/temas.css";

const PreguntaCard = ({ pregunta, onResponder, respuestaSeleccionada }) => {
  const opciones = [
    pregunta.respuesta_uno,
    pregunta.respuesta_dos,
    pregunta.respuesta_tres,
    pregunta.respuesta_cuatro
  ];

  return (
    <div className="pregunta-card">
      <h3>{pregunta.descripcion}</h3>

      <div className="opciones-lista">
        {opciones.map((op, index) => (
          <button
            key={index}
            className={`opcion-btn ${
              respuestaSeleccionada === op ? "seleccionada" : ""
            }`}
            onClick={() => onResponder(pregunta.id_reto, op)}
          >
            {op}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PreguntaCard;
