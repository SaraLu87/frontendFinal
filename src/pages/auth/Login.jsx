//  src/pages/auth/Login.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuario } from "../../context/UsuarioContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUsuario();

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const enviar = async (e) => {
    e.preventDefault();
    const res = await login(correo, contrasena); //----

    if (res.ok) {
      navigate("/");
    } else {
      alert(res.mensaje);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar sesión</h2>

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

        <button className="btn btn-primary w-100">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
