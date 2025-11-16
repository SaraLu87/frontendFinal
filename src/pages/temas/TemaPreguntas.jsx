// src/pages/temas/TemaPreguntas.jsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import axios from "../../services/api";

import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";

const TemaPreguntas = () => {
  const { id } = useParams();
  const [preguntas, setPreguntas] = useState([]);

  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(null);

  useEffect(() => {
    // 🔵 Cuando el backend esté listo, activar:
    /*
    axios.get(`/temas/${id}/preguntas/`)
      .then(res => setPreguntas(res.data))
      .catch(err => console.error(err));
    */
  }, [id]);

  const verificarRespuesta = (preguntaId, opcion) => {
    setRespuestaSeleccionada(opcion);

    // 🟢 Aquí luego enviamos la respuesta a la BD
    /*
    axios.post(`/progreso/responder/`, {
        tema_id: id,
        pregunta_id: preguntaId,
        opcion
    })
    .then(res => setRespuestaCorrecta(res.data.correcta))
    */
  };

  return (
    <>
      <Header />

      <div style={{ padding: "40px 20px" }}>
        <h1 style={{ color: "#8A4FFF", fontWeight: "700" }}>
          Preguntas del Tema {id}
        </h1>

        {preguntas.length === 0 && (
          <p style={{ color: "#6b7280" }}>
            Aquí se cargarán las preguntas desde la BD.
          </p>
        )}
      </div>

      <Footer />
    </>
  );
};

export default TemaPreguntas;
