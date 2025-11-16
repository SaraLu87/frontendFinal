// src/components/Header.jsx
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUsuario } from "../context/UsuarioContext";
import { useMonedas } from "../context/MonedasContext";
import logo from "../assets/logo.png";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { usuario, logout } = useUsuario();
  const { monedas } = useMonedas();

  // Ocultar Header en las páginas de auth
  if (
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/recuperar"
  ) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="header">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="header-brand"
        >
          <img src={logo} alt="EduFinanzas" className="header-logo" />
          EduFinanzas
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse className="justify-content-end">
          <Nav className="header-nav">

            <span className="header-monedas">
              💰 {monedas} monedas
            </span>

            {usuario && (
              <span className="header-usuario">
                Hola, {usuario.nombre}
              </span>
            )}

            <Nav.Link as={Link} to="/" className="header-link">
              Inicio
            </Nav.Link>

            <Nav.Link as={Link} to="/perfil" className="header-link">
              Mi Perfil
            </Nav.Link>

            <Nav.Link className="header-logout" onClick={handleLogout}>
              Cerrar sesión
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
