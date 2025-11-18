// 📌 Archivo: src/services/api.js

import axios from "axios";

// Cambia esta URL cuando tengas tu backend real
export default axios.create({
  baseURL: "http://localhost:8000/api",
  headers: { "Content-Type": "application/json" }
});
