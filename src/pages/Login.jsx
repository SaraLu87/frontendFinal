import { Container, Form, Button } from "react-bootstrap";

export default function Login() {
  return (
    <Container className="page-container" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4 text-center">Iniciar sesión</h2>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Correo</Form.Label>
          <Form.Control type="email" placeholder="tu@email.com" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="•••••••" />
        </Form.Group>

        <Button className="w-100 btn-primary">Ingresar</Button>
      </Form>
    </Container>
  );
}
