import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/global.css'
import { UsuarioProvider } from './context/UsuarioContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UsuarioProvider>
      <MonedasProvider>
        <ProgresoProvider>
          <App />
        </ProgresoProvider>
      </MonedasProvider>
    </UsuarioProvider>
  </React.StrictMode>
)
