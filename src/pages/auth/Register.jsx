// src/pages/auth/Register.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuario } from "../../context/UsuarioContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useUsuario();

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [nombre, setNombre] = useState("");

  const enviar = async (e) => {
    e.preventDefault();

    const res = await register(correo, contrasena, nombre); //---

    if (res.ok) {
      navigate("/");
    } else {
      alert(res.mensaje);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Crear cuenta</h2>

      <form onSubmit={enviar}>
        <div className="mb-3">
          <label>Correo</label>
          <input
            type="email"
            className="form-control"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Nombre del perfil</label>
          <input
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <button className="btn btn-success w-100">Registrarme</button>
      </form>
    </div>
  );
};

export default Register;
