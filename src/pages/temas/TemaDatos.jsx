// src/pages/temas/TemaDatos.jsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import axios from "../../services/api";

import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";

const TemaDatos = () => {
  const { id } = useParams();
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    // Cuando el backend esté listo:
    /*
    axios.get(`/temas/${id}/datos/`)
      .then(res => setDatos(res.data))
      .catch(err => console.error(err));
    */
  }, [id]);

  return (
    <>
      <Header />

      <div style={{ padding: "40px 20px" }}>
        <h1 style={{ color: "#52E36A", fontWeight: "700" }}>
          Datos curiosos del Tema {id}
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "30px"
          }}
        >
          {/* CUADROS DINÁMICOS */}
          {datos.length === 0 && (
            <p style={{ color: "#6b7280" }}>
              Aquí aparecerán datos curiosos desde la BD.
            </p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TemaDatos;
