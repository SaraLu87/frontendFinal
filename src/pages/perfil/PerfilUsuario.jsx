import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, ProgressBar, Badge } from "react-bootstrap";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useUsuario } from "../../context/UsuarioContext";
import { useMonedas } from "../../context/MonedasContext";
import api from "../../services/api";
import logo from "../../assets/logo.png";
import "./Perfil.css";

const PerfilUsuario = () => {
  const { usuario } = useUsuario();
  const { cargarMonedas } = useMonedas();

  const [loading, setLoading] = useState(true);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [perfil, setPerfil] = useState(null);
  const [estadisticas, setEstadisticas] = useState({});
  const [metas, setMetas] = useState([]);

  const [datosEditados, setDatosEditados] = useState({
    nombre_perfil: "",
    correo: "",
    foto_perfil: "",
  });
  const [fotoPreview, setFotoPreview] = useState(null);

  useEffect(() => {
    if (usuario && (usuario.id || usuario.id_usuario)) {
      cargarPerfil();
    } else {
      // Si no hay usuario, establecer perfil por defecto para mostrar la interfaz
      setPerfil({
        id_perfil: null,
        id_usuario: null,
        nombre_perfil: "Usuario",
        correo: "",
        foto_perfil: "default.png",
        monedas: 0,
        rol: "Usuario"
      });
      setDatosEditados({
        nombre_perfil: "Usuario",
        correo: "",
        foto_perfil: "default.png",
      });
      setEstadisticas({ lecciones_completadas: 0, retos_completados: 0 });
      setMetas([]);
      setLoading(false);
    }
  }, [usuario]);

  const cargarPerfil = async () => {
    setLoading(true);
    try {
      const idUsuario = usuario?.id_usuario || usuario?.id;
      if (!idUsuario) {
        throw new Error("ID de usuario no disponible");
      }

      // Intentar obtener el perfil
      let resPerfil;
      try {
        resPerfil = await api.get(`/perfiles/usuario/${idUsuario}/`);
      } catch (error) {
        // Si el perfil no existe (404), crear uno por defecto
        if (error.response?.status === 404) {
          console.log("Perfil no encontrado, creando perfil por defecto...");
          // Crear perfil por defecto
          const nuevoPerfil = {
            id_usuario: idUsuario,
            nombre_perfil: usuario?.nombre || usuario?.correo?.split('@')[0] || "Usuario",
            foto_perfil: "default.png",
            tema_actual: 1,
            monedas: 0
          };
          
          try {
            const resCrear = await api.post(`/perfiles/`, nuevoPerfil);
            resPerfil = { data: resCrear.data };
          } catch (createError) {
            console.error("Error al crear perfil:", createError);
            // Si falla la creación, usar datos por defecto
            resPerfil = {
              data: {
                id_perfil: null,
                id_usuario: idUsuario,
                nombre_perfil: usuario?.nombre || usuario?.correo?.split('@')[0] || "Usuario",
                correo: usuario?.email || usuario?.correo || "",
                foto_perfil: "default.png",
                monedas: 0,
                rol: "Usuario"
              }
            };
          }
        } else {
          throw error;
        }
      }

      // Si tenemos un perfil válido
      if (resPerfil?.data) {
        setPerfil(resPerfil.data);

        setDatosEditados({
          nombre_perfil: resPerfil.data.nombre_perfil || "",
          correo: resPerfil.data.correo || usuario?.email || usuario?.correo || "",
          foto_perfil: resPerfil.data.foto_perfil || "",
        });

        // Cargar estadísticas solo si tenemos id_perfil
        if (resPerfil.data.id_perfil) {
          try {
            const resStats = await api.get(`/progresos/estadisticas/${resPerfil.data.id_perfil}/`);
            setEstadisticas(resStats.data || { lecciones_completadas: 0, retos_completados: 0 });
          } catch (error) {
            console.error("Error al cargar estadísticas:", error);
            setEstadisticas({ lecciones_completadas: 0, retos_completados: 0 });
          }

          try {
            const resMetas = await api.get(`/progresos/metas/${resPerfil.data.id_perfil}/`);
            setMetas(resMetas.data || []);
          } catch (error) {
            console.error("Error al cargar metas:", error);
            setMetas([]);
          }
        } else {
          setEstadisticas({ lecciones_completadas: 0, retos_completados: 0 });
          setMetas([]);
        }

        if (cargarMonedas) cargarMonedas();
      } else {
        // Si no hay datos, establecer perfil por defecto
        const idUsuario = usuario?.id_usuario || usuario?.id;
        setPerfil({
          id_perfil: null,
          id_usuario: idUsuario || 1,
          nombre_perfil: usuario?.nombre || usuario?.correo?.split('@')[0] || "Usuario",
          correo: usuario?.email || usuario?.correo || "",
          foto_perfil: "default.png",
          monedas: 0,
          rol: "Usuario"
        });
        setDatosEditados({
          nombre_perfil: usuario?.nombre || usuario?.correo?.split('@')[0] || "Usuario",
          correo: usuario?.email || usuario?.correo || "",
          foto_perfil: "default.png",
        });
        setEstadisticas({ lecciones_completadas: 0, retos_completados: 0 });
        setMetas([]);
      }
    } catch (error) {
      console.error("Error al cargar perfil:", error);
      // Establecer perfil por defecto para que la interfaz funcione
      const idUsuario = usuario?.id_usuario || usuario?.id;
      setPerfil({
        id_perfil: null,
        id_usuario: idUsuario || 1,
        nombre_perfil: usuario?.nombre || usuario?.correo?.split('@')[0] || "Usuario",
        correo: usuario?.email || usuario?.correo || "",
        foto_perfil: "default.png",
        monedas: 0,
        rol: "Usuario"
      });
      setDatosEditados({
        nombre_perfil: usuario?.nombre || usuario?.correo?.split('@')[0] || "Usuario",
        correo: usuario?.email || usuario?.correo || "",
        foto_perfil: "default.png",
      });
      setEstadisticas({ lecciones_completadas: 0, retos_completados: 0 });
      setMetas([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEditar = () => setModoEdicion(true);

  const handleCancelar = () => {
    setModoEdicion(false);
    if (perfil) {
      setDatosEditados({
        nombre_perfil: perfil.nombre_perfil || "",
        correo: perfil.correo || "",
        foto_perfil: perfil.foto_perfil || "",
      });
    }
    setFotoPreview(null);
  };

  const handleGuardar = async () => {
    if (!perfil) return;
    try {
      // Si el perfil no tiene id_perfil, crear uno nuevo
      if (!perfil.id_perfil) {
        const nuevoPerfil = {
          id_usuario: perfil.id_usuario,
          nombre_perfil: datosEditados.nombre_perfil,
          foto_perfil: datosEditados.foto_perfil,
          tema_actual: perfil.tema_actual || 1,
          monedas: perfil.monedas || 0
        };
        
        const resCrear = await api.post(`/perfiles/`, nuevoPerfil);
        setPerfil(resCrear.data);
        
        // El correo se actualizará cuando se actualice el perfil la próxima vez
        // Por ahora solo guardamos el perfil
      } else {
        // Actualizar perfil existente
        await api.patch(`/perfiles/${perfil.id_perfil}/actualizar-datos/`, {
          nombre_perfil: datosEditados.nombre_perfil,
          correo: datosEditados.correo,
          foto_perfil: datosEditados.foto_perfil,
        });
      }
      
      await cargarPerfil();
      setModoEdicion(false);
      setFotoPreview(null);
      alert("Perfil actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      alert("Error al actualizar el perfil: " + (error.response?.data?.detail || error.message));
    }
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result);
        setDatosEditados((prev) => ({ ...prev, foto_perfil: file.name }));
      };
      reader.readAsDataURL(file);
    }
  };

  const calcularProgresoGeneral = () => {
    if (!metas.length) return 0;
    const total = metas.reduce((acc, m) => acc + (m.progreso || 0), 0);
    return Math.round(total / metas.length);
  };

  if (loading)
    return (
      <>
        <Header />
        <Container className="perfil-page-container">
          <div className="text-center py-5">Cargando perfil...</div>
        </Container>
        <Footer />
      </>
    );

  // Validación de seguridad: si por alguna razón el perfil es null después de cargar, usar valores por defecto
  const perfilDisplay = perfil || {
    id_perfil: null,
    id_usuario: usuario?.id_usuario || usuario?.id || null,
    nombre_perfil: usuario?.nombre || usuario?.correo?.split('@')[0] || "Usuario",
    correo: usuario?.email || usuario?.correo || "",
    foto_perfil: "default.png",
    monedas: 0,
    rol: "Usuario"
  };

  return (
    <>
      <Header />
      <Container className="perfil-page-container">
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="perfil-title">Mi Perfil</h1>
              {!modoEdicion ? (
                <Button onClick={handleEditar}>Editar Perfil</Button>
              ) : (
                <div className="d-flex gap-2">
                  <Button variant="outline-secondary" onClick={handleCancelar}>
                    Cancelar
                  </Button>
                  <Button onClick={handleGuardar}>Guardar</Button>
                </div>
              )}
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={6} className="mb-4">
            <Card className="perfil-card perfil-card-shadow text-center">
              <div className="perfil-foto-wrapper">
                <img
                  src={
                    fotoPreview ||
                    (perfilDisplay.foto_perfil && perfilDisplay.foto_perfil !== "default.png"
                      ? `/uploads/${perfilDisplay.foto_perfil}`
                      : logo)
                  }
                  alt="Foto de perfil"
                  className="perfil-foto"
                />
                {modoEdicion && (
                  <label className="perfil-foto-upload-btn">
                    <span>📷</span>
                    <input type="file" accept="image/*" onChange={handleFotoChange} style={{ display: "none" }} />
                  </label>
                )}
              </div>

              {modoEdicion ? (
                <Form.Group className="mt-3">
                  <Form.Control
                    type="text"
                    value={datosEditados.nombre_perfil}
                    onChange={(e) => setDatosEditados({ ...datosEditados, nombre_perfil: e.target.value })}
                    className="perfil-form-control text-center"
                    placeholder="Nombre del perfil"
                  />
                </Form.Group>
              ) : (
                <>
                  <h3>{perfilDisplay.nombre_perfil}</h3>
                  <p>{perfilDisplay.correo}</p>
                </>
              )}

              <div className="perfil-monedas-box mt-3">
                <span className="perfil-monedas-icon">💰</span>
                <div>
                  <div className="perfil-monedas-count">{perfilDisplay.monedas || 0}</div>
                  <div className="perfil-monedas-label">Monedas Ganadas</div>
                </div>
              </div>
            </Card>
          </Col>

          <Col md={6} className="mb-4">
            <Card className="perfil-card perfil-card-shadow">
              <h3>Datos Personales</h3>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre del perfil</Form.Label>
                    {modoEdicion ? (
                      <Form.Control
                        type="text"
                        value={datosEditados.nombre_perfil}
                        onChange={(e) => setDatosEditados({ ...datosEditados, nombre_perfil: e.target.value })}
                      />
                    ) : (
                      <p>{perfilDisplay.nombre_perfil}</p>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Correo electrónico</Form.Label>
                    {modoEdicion ? (
                      <Form.Control
                        type="email"
                        value={datosEditados.correo}
                        onChange={(e) => setDatosEditados({ ...datosEditados, correo: e.target.value })}
                      />
                    ) : (
                      <p>{perfilDisplay.correo}</p>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Rol</Form.Label>
                    <p>{perfilDisplay.rol || "Usuario"}</p>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>ID de usuario</Form.Label>
                    <p>{perfilDisplay.id_usuario || "N/A"}</p>
                  </Form.Group>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={6} className="mb-4">
            <Card className="perfil-card perfil-card-shadow">
              <h3>Estadísticas</h3>
              <Row>
                <Col xs={6}>
                  <div>
                    <div>📚</div>
                    <div>
                      {estadisticas.lecciones_completadas || 0}/{metas.length || 0}
                    </div>
                    <div>Lecciones</div>
                  </div>
                </Col>
                <Col xs={6}>
                  <div>
                    <div>🏆</div>
                    <div>{estadisticas.retos_completados || 0}</div>
                    <div>Retos</div>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col md={6} className="mb-4">
            <Card className="perfil-card perfil-card-shadow">
              <h3>Mis Metas de Aprendizaje</h3>
              <div className="mb-4 d-flex justify-content-between align-items-center">
                <span>Progreso General</span>
                <Badge>{calcularProgresoGeneral()}%</Badge>
              </div>
              <ProgressBar now={calcularProgresoGeneral()} variant="primary" />
              <div>
                {metas.length > 0 ? (
                  metas.map((meta) => (
                    <div key={meta.id_tema} className="mb-3">
                      <div className="d-flex justify-content-between">
                        <div>
                          <span>⏳</span> {meta.nombre}
                        </div>
                        <span>{meta.progreso}%</span>
                      </div>
                      <ProgressBar now={meta.progreso} variant="primary" />
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No hay metas disponibles</p>
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default PerfilUsuario;
