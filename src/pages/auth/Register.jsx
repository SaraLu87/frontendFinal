// src/pages/auth/Register.jsx

import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/global.css";
import "./register.css";   // ← Import del CSS del registro

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    edad: "",
    password: "",
    password2: "",
    foto: null,
    acepta: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else if (type === "file") {
      setForm({ ...form, foto: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.acepta) {
      alert("Debes aceptar las políticas para continuar");
      return;
    }

    if (form.password !== form.password2) {
      alert("Las contraseñas no coinciden");
      return;
    }

    /* 
    ╔════════════════════════════════════════════════╗
    ║   ⭐ CUANDO EL BACKEND JWT ESTÉ LISTO CAMBIAR ⭐   ║
    ╚════════════════════════════════════════════════╝

    const data = new FormData();
    data.append("nombre", form.nombre);
    data.append("correo", form.correo);
    data.append("edad", form.edad);
    data.append("password", form.password);
    if (form.foto) data.append("foto", form.foto);

    const response = await api.post("/usuarios/register/", data, {
        headers: { "Content-Type": "multipart/form-data" }
    });

    navigate("/login");
    return;
    */

    // 🔴 TEMPORAL — SIMULA registro
    alert("Usuario registrado correctamente (simulado)");
    navigate("/login");
  };

  return (
    <div className="register-container">
      <Container className="register-card">
        <h2 className="register-title">Crea tu cuenta</h2>
        <p className="register-subtitle">
          Únete a EduFinanzas y mejora tus habilidades financieras.
        </p>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre completo</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
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
            <Form.Label>Edad</Form.Label>
            <Form.Control
              type="number"
              name="edad"
              value={form.edad}
              min="14"
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* FOTO */}
          <Form.Group className="mb-4">
            <Form.Label>Foto de perfil (opcional)</Form.Label>
            <Form.Control
              type="file"
              name="foto"
              accept="image/*"
              onChange={handleChange}
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
              minLength={6}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Confirmar contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password2"
              value={form.password2}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* POLÍTICAS */}
          <Form.Group className="mb-4">
            <Form.Check
              type="checkbox"
              label="Acepto las políticas de privacidad"
              name="acepta"
              checked={form.acepta}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button className="register-btn" type="submit">
            Crear cuenta
          </Button>
        </Form>

        <p className="register-footer">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </Container>
    </div>
  );
};

export default Register;
