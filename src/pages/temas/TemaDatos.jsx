// src/pages/temas/TemaDatos.jsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TarjetaDato from "./components/TarjetaDato";
import { useProgreso } from "../../context/ProgresoContext";
import { TEMAS_CONFIG } from "../../constants/temas";

const TemaDatos = () => {
  const { id } = useParams();
  const { actualizarProgreso } = useProgreso();
  const [datos, setDatos] = useState([]);

  const tema = TEMAS_CONFIG.find((t) => t.id === parseInt(id));

  useEffect(() => {
    actualizarProgreso(parseInt(id), "datos");

    // mock de datos curiosos
    setDatos([
      { id: 1, texto: "Dato 1 importante relacionado con el tema." },
      { id: 2, texto: "Dato 2 interesante." },
      { id: 3, texto: "Dato 3 del tema correspondiente." },
    ]);
  }, [id]);

  return (
    <>
      <Header />

      <div className="contenido-tema">
        <h1 className="titulo-seccion">{tema.nombre} - Datos curiosos</h1>

        <div className="tarjetas-container">
          {datos.map((d) => (
            <TarjetaDato key={d.id} texto={d.texto} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TemaDatos;
