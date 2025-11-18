import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/global.css'
import { UsuarioProvider } from './context/UsuarioContext'
import { MonedasProvider } from "./context/MonedasContext";
import { ProgresoProvider } from "./context/ProgresoContext";
import { TemaProvider } from "./context/TemasContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UsuarioProvider>
      <MonedasProvider>
        <ProgresoProvider>
          <TemaProvider>
            <App />
          </TemaProvider>
        </ProgresoProvider>
      </MonedasProvider>
    </UsuarioProvider>
  </React.StrictMode>
)
