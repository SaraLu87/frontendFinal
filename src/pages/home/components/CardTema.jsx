// src/pages/home/components/CardTema.jsx

import "./homeComponents.css";
import { useNavigate } from "react-router-dom";

const CardTema = ({ tema }) => {
  const navigate = useNavigate();

  return (
    <div
      className="card-tema"
      onClick={() => navigate(`/tema/${tema.id}`)} // Ruta dinámica según tema
    >
      <div className="card-tema-img">
        {/* Imagen desde backend */}
        {/* <img src={tema.imagen} alt={tema.nombre} /> */}
      </div>
      <h4>{tema.nombre}</h4>
      <p>{tema.descripcion}</p>
    </div>
  );
};

export default CardTema;
