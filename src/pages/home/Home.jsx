// src/pages/home/Home.jsx

import { useEffect } from "react";
import { Container } from "react-bootstrap";
import "../../styles/global.css";
import "./home.css";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import CardTema from "./components/CardTema";
import CardTip from "./components/CardTip";

const Home = () => {

  // Datos temporales (cuando BD esté lista se reemplazan)
  const temas = [
    {
      id: 1,
      nombre: "Ahorro",
      descripcion: "Aprende a manejar tu dinero con inteligencia",
      imagen: null,
      // imagen: "/api/media/temas/ahorro.png" // ← Cambiar por URL del backend
    },
    {
      id: 2,
      nombre: "Presupuesto",
      descripcion: "Organiza tus gastos sin estresarte",
      imagen: null,
      // imagen: "/api/media/temas/presupuesto.png" 
    },
    {
      id: 3,
      nombre: "Inversión",
      descripcion: "Haz que tu dinero trabaje para ti",
      imagen: null,
      // imagen: "/api/media/temas/inversion.png"
    },
    {
      id: 4,
      nombre: "Seguridad",
      descripcion: "Protege tu dinero como un profesional",
      imagen: null,
      // imagen: "/api/media/temas/seguridad.png"
    },
  ];

  const tips = [
    {
      id: 1,
      texto: "Ahorra al menos el 10% de todo lo que ganes",
      // imagen: "/api/media/tips/tip1.png",
      imagen: null,
    },
    {
      id: 2,
      texto: "Antes de comprar, pregúntate si realmente lo necesitas",
      // imagen: "/api/media/tips/tip2.png",
      imagen: null,
    },
    {
      id: 3,
      texto: "Evita deudas largas por compras pequeñas",
      // imagen: "/api/media/tips/tip3.png",
      imagen: null,
    },
  ];

  return (
    <>
      <Header />

      <div className="home-container">
        <Container>

          {/* BIENVENIDA */}
          <section className="home-section bienvenida-section">
            <h1 className="home-title">¡Bienvenido a EduFinanzas! 💰</h1>
            <p className="home-subtitle">
              Aprende finanzas de forma divertida, práctica y diseñada para jóvenes como tú.
            </p>
          </section>

          {/* TEMAS */}
          <section className="home-section temas-section">
            <h2 className="home-section-title">Temas principales</h2>
            <div className="temas-grid">
              {temas.map((tema) => (
                <CardTema
                  key={tema.id}
                  tema={tema}
                />
              ))}
            </div>
          </section>

          {/* TIPS */}
          <section className="home-section tips-section">
            <h2 className="home-section-title">Tips del día 🌟</h2>
            <div className="tips-grid">
              {tips.map((tip) => (
                <CardTip key={tip.id} tip={tip} />
              ))}
            </div>
          </section>

        </Container>
      </div>

      <Footer />
    </>
  );
};

export default Home;
