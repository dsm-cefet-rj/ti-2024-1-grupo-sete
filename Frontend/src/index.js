import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/**
 * Ponto de entrada principal da aplicação.
 * Este arquivo é responsável por renderizar o componente 'App' e configurar a medição de desempenho da aplicação.
 * @function
 * @returns {void}
 */
const root = ReactDOM.createRoot(document.getElementById('root'));

/**
 * Renderiza o componente 'App' na raiz do DOM.
 * @function
 * @returns {void}
 */
root.render(
    <App />
);
reportWebVitals();
