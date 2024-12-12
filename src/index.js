import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar Bootstrap
import App from './App';

// Detección del entorno: si estás en modo de desarrollo, renderiza automáticamente
if (process.env.NODE_ENV === 'development') {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App unidad="butik_tiendas_retail" />);
  }
}

// Función para inyectar la aplicación React en un elemento específico del DOM
export function renderApp(elementId) {
  const rootElement = document.getElementById(elementId);
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
  }
}

// Hacer que la función renderApp sea accesible globalmente como EthicForm
window.EthicForm = {
  renderApp
};