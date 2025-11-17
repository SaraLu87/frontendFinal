// src/pages/temas/TemaInfo.jsx

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useProgreso } from "../../context/ProgresoContext";
import { TEMAS_CONFIG } from "../../constants/temas";

const TemaInfo = () => {
  const { id } = useParams();
  const { actualizarProgreso } = useProgreso();

  const tema = TEMAS_CONFIG.find((t) => t.id === parseInt(id));

  useEffect(() => {
    // registrar que entró a la sección info
    actualizarProgreso(parseInt(id), "info");
  }, [id]);

  return (
    <>
      <Header />

      <div className="contenido-tema">
        <h1 className="titulo-seccion">{tema.nombre} - Información</h1>

        <div className="bloque-info">
          <p>
            Aquí aparecerá la información oficial del tema desde backend cuando
            esté listo.
          </p>

          <ul>
            <li>Concepto principal del tema.</li>
            <li>Ejemplos de la vida real.</li>
            <li>Explicación clara del contenido.</li>
          </ul>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TemaInfo;
