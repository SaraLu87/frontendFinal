// import axios from "axios";

// const API_URL = "http://127.0.0.1:8000/api/usuarios";
// const API_URL_LOGIN = "http://127.0.0.1:8000/api/login_usuario";

// /**
//  * Obtener listado de todos los médicos (solo datos públicos)
//  */
// export async function loguearUsuarios(correo, contrasena) {
//   try {
//     const res = await axios.post(API_URL_LOGIN + "/" , { correo, contrasena });
//     console.log(res.data)
//     return res.data;
//   } catch (error) {
//     console.error("Error al loguear Usuario", error);
//     throw error;
//   }
// }

// /**
//  * Obtener perfil completo de un médico por su ID_Usuario
//  */
// export async function obtenerPerfilMedico(idUsuario) {
//   try {
//     const res = await axios.get(`${API_URL}/${idUsuario}/`);
//     return res.data;
//   } catch (error) {
//     console.error("Error obteniendo perfil del médico:", error);
//     throw error;
//   }
// }