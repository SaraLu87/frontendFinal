// src/pages/temas/TemaCompletado.jsx

import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";

import { useMonedas } from "../../context/MonedasContext";
import { useProgreso } from "../../context/ProgresoContext";
import { useUsuario } from "../../context/UsuarioContext";

import api from "../../services/api";
import "./temas.css";

const TemaCompletado = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { usuario } = useUsuario();
  const { ganarMonedas } = useMonedas();
  const { cargarProgreso } = useProgreso();

  const temaId = Number(id);
  const siguienteTema = temaId < 4 ? temaId + 1 : null;

  // Recompensas definidas según tu lógica
  const RECOMPENSAS_TEMA = {
    1: 250,
    2: 400,
    3: 350,
    4: 10000,
  };

  const recompensa = RECOMPENSAS_TEMA[temaId] ?? 0;

  const procesarTemaCompletado = async () => {
    try {/* CONEXION*/
      // 1️⃣ Registrar que este tema fue completado
      await api.post("/progreso/tema-completado/", {
        id_perfil: usuario.id_perfil,
        id_tema: temaId,
        fecha_completado: new Date(),
      });

      // 2️⃣ Sumar monedas en BD y Contexto
      await api.patch(`/perfiles/${usuario.id_perfil}/monedas/`, {
        monedas: usuario.monedas + recompensa,
      });

      ganarMonedas(recompensa);

      // 3️⃣ (Opcional) actualizar el tema actual del usuario
      await api.patch(`/perfiles/${usuario.id_perfil}/`, {
        tema_actual: siguienteTema ?? 4, // si es último, queda en 4
      });

      // 4️⃣ Recargar progreso del contexto
      cargarProgreso();

    } catch (error) {
      console.error("Error al registrar tema completado:", error);
    }
  };

  // Ejecuta una sola vez
  useEffect(() => {
    procesarTemaCompletado();
  }, []);

  return (
    <>
      <Header />

      <div className="tema-completado-container">
        <div className="tema-completado-card animate-pop">

          <h1>¡Tema {temaId} completado! 🎉</h1>

          <p className="mensaje">
            ¡Excelente trabajo! Has completado un paso importante para mejorar tus finanzas.
          </p>

          <h2 className="recompensa">
            + {recompensa} monedas 💰
          </h2>

          <div className="botones-final">
            <button className="btn-volver" onClick={() => navigate("/")}>
              Volver al inicio
            </button>

            {siguienteTema ? (
              <button
                className="btn-siguiente"
                onClick={() => navigate(`/tema/${siguienteTema}`)}
              >
                Ir al Tema {siguienteTema} →
              </button>
            ) : (
              <p className="mensaje-final">
                🎉 ¡Has completado todos los temas!  
                Ahora aplica en la vida real lo aprendido. 💚
              </p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TemaCompletado;
