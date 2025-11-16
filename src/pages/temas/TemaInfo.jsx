// src/pages/temas/TemaInfo.jsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import axios from "../../services/api";  <-- Se activará cuando el backend esté listo

import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";

const TemaInfo = () => {
  const { id } = useParams(); // ID del tema (ej: /tema/1/info)
  const [tema, setTema] = useState(null);

  useEffect(() => {
    // CUANDO EL BACKEND ESTÉ LISTO, ACTIVAR ESTO:
    /*
    axios.get(`/temas/${id}/info/`)
      .then(res => setTema(res.data))
      .catch(err => console.error(err));
    */
  }, [id]);

  return (
    <>
      <Header />

      <div style={{ padding: "40px 20px" }}>
        <h1 style={{ color: "#2F7AD9", fontWeight: "700" }}>
          Información del Tema {id}
        </h1>

        {/* 
          Cuando el backend esté listo:
          Aquí se mostrará:
          - Nombre del tema
          - Descripción
          - Listado de información educativa
        */}

        <div
          style={{
            background: "#F8FAFC",
            padding: "20px",
            borderRadius: "12px",
            marginTop: "25px",
            minHeight: "250px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
          }}
        >
          {/* CONTENIDO DINÁMICO */}
          <p style={{ color: "#6b7280" }}>
            Aquí se cargará la información desde la base de datos.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TemaInfo;
