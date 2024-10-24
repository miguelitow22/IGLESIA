import React from 'react';
import ReactDOM from 'react-dom/client'; // Actualizado para React 18+
import App from './App';
import './index.css'; // Si tienes estilos globales

// Crear el root element para React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizar la aplicación
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
