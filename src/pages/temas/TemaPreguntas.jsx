// src/pages/temas/TemaPreguntas.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import api from "../../services/api";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";

import PreguntaCard from "./components/PreguntaCard";
import { useProgreso } from "../../context/ProgresoContext";
import { useMonedas } from "../../context/MonedasContext";

import "./temas.css";

const TemaPreguntas = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { ganarMonedas } = useMonedas();
  const { actualizarProgreso } = useProgreso();

  const [preguntas, setPreguntas] = useState([]);
  const [respondidas, setRespondidas] = useState({});
  const [loading, setLoading] = useState(true);

  // ================================
  // 1. Cargar preguntas desde backend
  // ================================
  useEffect(() => {
    const cargar = async () => {
      try {
        /*
        const res = await api.get(`/temas/${id}/preguntas/`);
        setPreguntas(res.data);
        */
        
        // TEMPORAL SIN BACKEND -------------------------
        setPreguntas([
          {
            id_reto: 1,
            descripcion: "¿Qué es ahorrar?",
            respuesta_uno: "Guardar dinero",
            respuesta_dos: "Gastar todo",
            respuesta_tres: "Pedir prestado",
            respuesta_cuatro: "Comprar ropa",
            respuestaCorrecta: "Guardar dinero",
            recompensa_monedas: 60
          },
          {
            id_reto: 2,
            descripcion: "¿Cuál es un gasto necesario?",
            respuesta_uno: "Comida",
            respuesta_dos: "Ropa de marca",
            respuesta_tres: "Videojuegos",
            respuesta_cuatro: "Uber todos los días",
            respuestaCorrecta: "Comida",
            recompensa_monedas: 60
          },
          {
            id_reto: 3,
            descripcion: "¿Qué es una meta financiera?",
            respuesta_uno: "Algo que quieres lograr con tu dinero",
            respuesta_dos: "Gastar en fiestas",
            respuesta_tres: "Comprar dulces",
            respuesta_cuatro: "Salir siempre a comer",
            respuestaCorrecta: "Algo que quieres lograr con tu dinero",
            recompensa_monedas: 60
          }
        ]);
        // ------------------------------------------------

      } catch (error) {
        console.error("Error cargando preguntas:", error);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, [id]);


  // =============================================
  // 2. Enviar respuesta → guardar progreso en BD
  // =============================================
  const responderPregunta = async (idReto, opcion) => {
    setRespondidas({
      ...respondidas,
      [idReto]: opcion
    });

    try {
      /*
      const res = await api.post("/progreso/responder/", {
        id_reto: idReto,
        respuesta: opcion,
        id_tema: id
      });
      */

      // TEMPORAL SIN BACKEND
      const pregunta = preguntas.find((p) => p.id_reto === idReto);

      if (pregunta.respuestaCorrecta === opcion) {
        ganarMonedas(pregunta.recompensa_monedas);
      }

    } catch (error) {
      console.error("Error guardando respuesta:", error);
    }

    // ¿Ya completó las 3 preguntas?
    if (Object.keys(respondidas).length + 1 === preguntas.length) {
      setTimeout(() => {
        navigate(`/tema/${id}/completado`);
      }, 1000);
    }
  };


  if (loading) return <p>Cargando...</p>;

  return (
    <>
      <Header />

      <div className="tema-preguntas-container">
        <h1 className="tema-title">Preguntas del Tema {id}</h1>

        {preguntas.map((pregunta) => (
          <PreguntaCard
            key={pregunta.id_reto}
            pregunta={pregunta}
            onResponder={responderPregunta}
            respuestaSeleccionada={respondidas[pregunta.id_reto]}
          />
        ))}
      </div>

      <Footer />
    </>
  );
};

export default TemaPreguntas;
