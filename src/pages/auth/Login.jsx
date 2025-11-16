// src/pages/auth/Login.jsx

import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/global.css";
import "./login.css"; // Import del CSS de login
import { useUsuario } from "../../context/UsuarioContext"; // cuando tengamos login real

const Login = () => {
  const navigate = useNavigate();
  const { setUsuario } = useUsuario(); // <-- se usará cuando conectemos JWT

  const [form, setForm] = useState({
    correo: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* 
    ╔════════════════════════════════════════════╗
    ║ ⭐ CUANDO TENGAS BACKEND JWT CAMBIAR POR:   ║
    ║ const resp = await api.post("/login/",...  ║
    ║ setUsuario(resp.data.user)                 ║
    ║ localStorage.setItem("token", resp.token); ║
    ╚════════════════════════════════════════════╝
    */

    // 🔴 TEMPORAL — solo simula login
    alert("Inicio de sesión exitoso (simulado)");
    setUsuario({
      nombre: "Usuario Demo",
      correo: form.correo,
      edad: 20,
    });

    navigate("/inicio");
  };

  return (
    <div className="login-container">
      <Container className="login-card">
        <h2 className="login-title">Inicia Sesión</h2>
        <p className="login-subtitle">Bienvenido de nuevo a EduFinanzas</p>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="text-end mb-3">
            <Link to="/recuperar" className="login-forgot">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <Button className="login-btn" type="submit">
            Ingresar
          </Button>
        </Form>

        <div className="login-divider">
          <span>o</span>
        </div>

        <Button className="login-google-btn">
          <span className="google-icon">🔵</span> Continuar con Google
        </Button>

        <p className="login-footer">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </Container>
    </div>
  );
};

export default Login;
