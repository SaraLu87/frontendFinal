// 📌 src/pages/home/HomeTemas.jsx
// Pantalla principal de TODOS los temas.
// Muestra: disponible, bloqueado o completado.
// Usa monedas, temasPagados y temasCompletados.
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { useMonedas } from "../../context/MonedasContext";
import { useTemas } from "../../context/TemasContext";
// import { TEMAS_CONFIG } from "../../constants/temas";

import "./homeTemas.css";

const HomeTemas = () => {
  const navigate = useNavigate();
  const { monedas, temasPagados, temasCompletados } = useMonedas();
  const { temas, getTemas, cargando, error } = useTemas();

  useEffect(() => {
    getTemas();
  }, []);

  const puedeEntrar = (tema) => {
    if (tema.id_tema === 1) return true;            // Tema 1 siempre disponible
    if (temasCompletados.includes(tema.id_tema)) return true;
    if (temasPagados.includes(tema.id_tema)) return true;
    return monedas >= tema.precio;
  };

  if (cargando) return <p>Cargando temas...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <Header />

      <div className="home-temas-container">
        <h1 className="home-title">Temas disponibles</h1>

        <div className="temas-grid">
          {temas.map((tema) => {
            const bloqueado = !puedeEntrar(tema);
            const completado = temasCompletados.includes(tema.id_tema);

            return (
              <div
                className={`tema-card ${bloqueado ? "bloqueado" : ""} ${
                  completado ? "completado" : ""
                }`}
                key={tema.id_tema}
              >
                <h2>{tema.nombre}</h2>
                <p className="descripcion">{tema.descripcion}</p>

                {/* Estado */}
                {completado && <p className="estado completado">✔ Completado</p>}
                {bloqueado && <p className="estado bloqueado">🔒 Bloqueado</p>}
                {!bloqueado && !completado && (
                  <p className="estado disponible">🔓 Disponible</p>
                )}

                {/* Precio */}
                {tema.id_tema !== 1 && (
                  <p className="precio">Costo: {tema.precio} monedas</p>
                )}

                <button
                  className="btn-entrar"
                  disabled={bloqueado}
                  onClick={() => navigate(`/tema/${tema.id_tema}`)}
                >
                  {bloqueado ? "No disponible" : "Entrar"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default HomeTemas;
