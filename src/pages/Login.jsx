import { Container, Form, Button } from "react-bootstrap";

export default function Login() {
  const { login } = useUsuario();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(null);

  async function handleLogin(e) {
    e.preventDefault();
    const result = await login(correo, contrasena);
    if (!result.ok) {
      setError(result.mensaje);
    } else {
      console.log("Login exitoso");
      // Aquí podrías redirigir al dashboard
    }
  }
  return (
    <Container className="page-container" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4 text-center">Iniciar sesión</h2>

      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Correo</Form.Label>
          <Form.Control 
            type="email"
            placeholder="tu@email.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control 
            type="password"
            placeholder="•••••••"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </Form.Group>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button className="w-100 btn-primary">Ingresar</Button>
      </Form>
    </Container>
  );
}
