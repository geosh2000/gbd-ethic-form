// src/index.js

import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar Bootstrap
import App from './App';

// const container = document.getElementById('root')
// const root = createRoot(container);
// root.render(<App unidad='atpm' />)

// Función para inyectar la aplicación React en un elemento específico del DOM
export function renderApp(elementId) {
  const rootElement = document.getElementById(elementId);
  
  // Usa ReactDOM.createRoot() en lugar de ReactDOM.render()
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}

// Hacer que la función renderApp sea accesible globalmente como MyReactApp
window.EthicForm = {
  renderApp
};

