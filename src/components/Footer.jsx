// src/components/Footer.jsx
import { Container } from "react-bootstrap";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container className="text-center">

        <h5 className="footer-phrase">
          "La educación financiera es el superpoder que transforma tu futuro 🚀"
        </h5>

        <p className="footer-sub">
          Aprende. Ahorra. Crece. — EduFinanzas 2025
        </p>

        <div className="footer-links">
          <a href="#" className="footer-link">Sobre Nosotros</a>
          <a href="#" className="footer-link">Misión</a>
          <a href="#" className="footer-link">Políticas</a>
          <a href="#" className="footer-link">Contacto</a>
        </div>

        <hr className="footer-line" />

        <p className="footer-copy">
          © {new Date().getFullYear()} EduFinanzas — Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
