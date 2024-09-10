/**
 * @fileoverview Configuração principal do servidor Express, incluindo rotas, middleware de CORS, e variáveis de ambiente.
 * @requires express
 * @requires cors
 * @requires dotenv
 * @requires ./routes/Routes
 */
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

/**
 * Instância do aplicativo Express.
 * @type {Object}
 */
const app = express();

/**
 * Middleware para permitir o uso de CORS
 * @function
 */
app.use(cors());

/**
 * Rotas principais da API.
 * @name /api
 * @function
 * @memberof module:routes/Routes
 */
const routes = require('./routes/Routes');
app.use('/api', routes);

/**
 * Exporta o aplicativo para ser usado em outros módulos.
 * @module app
 */
module.exports = app;