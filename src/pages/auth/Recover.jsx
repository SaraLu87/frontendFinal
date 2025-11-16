// src/pages/auth/Recover.jsx

import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/global.css";
import "./recover.css";

const Recover = () => {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    /*
    ╔═══════════════════════════════════════════════╗
    ║ ⭐ CUANDO EL BACKEND ESTÉ LISTO CAMBIAR POR:    ║
    ║ await api.post("/auth/password-reset/", {      ║
    ║      email                                     ║
    ║ })                                             ║
    ╚═══════════════════════════════════════════════╝
    */

    // Simulación temporal
    setEnviado(true);
  };

  return (
    <div className="recover-container">
      <Container className="recover-card">
        <h2 className="recover-title">Recuperar contraseña</h2>

        {!enviado ? (
          <>
            <p className="recover-subtitle">
              Ingresa tu correo electrónico y te enviaremos instrucciones para recuperar tu contraseña.
            </p>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="tu-email@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Button type="submit" className="recover-btn">
                Enviar instrucciones
              </Button>
            </Form>

            <p className="recover-footer">
              <Link to="/login">Volver al inicio de sesión</Link>
            </p>
          </>
        ) : (
          <>
            <p className="recover-success">
              📩 Si tu correo está registrado, recibirás un mensaje con los pasos para recuperar tu contraseña.
            </p>

            <Button className="recover-btn mt-4" as={Link} to="/login">
              Volver al Login
            </Button>
          </>
        )}
      </Container>
    </div>
  );
};

export default Recover;
