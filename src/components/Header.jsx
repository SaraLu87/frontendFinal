// src/components/Header.jsx

//  HEADER PARA TODA LA APP
//  logo, nombre, monedas y logout

import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useUsuario } from "../context/UsuarioContext";
import { useMonedas } from "../context/MonedasContext";

import logo from "../assets/logo.png"; //  Imagen viene del backend luego

import "../components/header.css";

const Header = () => {
  const navigate = useNavigate();
  const { usuario, logout } = useUsuario();
  const { monedas } = useMonedas();

  const handleLogout = () => {
    logout();          // 1. Cierra sesión
    navigate("/login") // 2. Envía a login
  };

  return (
    <Navbar expand="lg" className="header">
      <Container>

        {/* LOGO + NOMBRE */}
        <Navbar.Brand
          className="header-brand"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="EduFinanzas"
            className="header-logo"
          />
          EduFinanzas
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse className="justify-content-end">

          <Nav className="header-nav">

            {/* MONEDAS */}
            <span className="header-monedas">
              💰 {monedas} monedas
            </span>

            {/* NOMBRE DEL USUARIO */}
            {usuario && (
              <span className="header-usuario">
                Hola, {usuario.nombre_perfil}
              </span>
            )}

            {/* NAVEGACIÓN */}
            <Nav.Link
              onClick={() => navigate("/")}
              className="header-link"
            >
              Inicio
            </Nav.Link>

            <Nav.Link
              onClick={() => navigate("/perfil")}
              className="header-link"
            >
              Mi Perfil
            </Nav.Link>

            {/* LOGOUT */}
            <Nav.Link
              onClick={handleLogout}
              className="header-logout"
            >
              Cerrar sesión
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};

export default Header;
