/**
 * @fileoverview Este arquivo é o ponto de entrada do servidor Express. Ele configura as rotas, conecta ao banco de dados e inicia o servidor.
 * @requires express
 * @requires dotenv/config
 * @requires cors
 * @requires ./src/database/db
 * @requires ./src/routes/user.route
 * @requires ./src/routes/auth.route
 * @requires ./src/routes/carros.route
 * @requires ./src/routes/aluguel.route
 * @requires ./src/routes/registro.route
 */

import express from 'express';
import connectDatabase from './src/database/db.js';
import userRoute from './src/routes/user.route.js';
import authRoute from './src/routes/auth.route.js';
import carrosRoute from './src/routes/carros.route.js';
import aluguelRoute from './src/routes/aluguel.route.js';
import registroRoute from './src/routes/registro.route.js';
//import "dotenv/config";
//require('dotenv').config()
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';

/**
 * Porta na qual o servidor será executado. Definida pela variável de ambiente PORT ou padrão para 5000.
 * @type {number|string}
 */
const port = process.env.PORT || 5000;

/**
 * Instância do aplicativo Express.
 * @type {Object}
 */
const app = express();
app.use(cors());

/**
 * Conecta ao banco de dados.
 * @function
 */
connectDatabase();

/**
 * Middleware que permite o uso de JSON nas requisições.
 * @function
 */
app.use(express.json());

/**
 * Rotas para a entidade 'user'.
 * @name /user
 * @function
 * @memberof module:routes/userRoute
 */
app.use("/user", userRoute);

/**
 * Rotas para autenticação.
 * @name /auth
 * @function
 * @memberof module:routes/authRoute
 */
app.use("/auth", authRoute);

/**
 * Rotas para a entidade 'carros'.
 * @name /carros
 * @function
 * @memberof module:routes/carrosRoute
 */
app.use("/carros", carrosRoute);

/**
 * Rotas para a entidade 'aluguel'.
 * @name /aluguel
 * @function
 * @memberof module:routes/aluguelRoute
 */
app.use("/aluguel", aluguelRoute);

/**
 * Rotas para a entidade 'registro'.
 * @name /registro
 * @function
 * @memberof module:routes/registroRoute
 */
app.use("/registro", registroRoute)

/**
 * Inicia o servidor e ouve na porta especificada.
 * @function
 * @param {number|string} port - Porta onde o servidor está escutando.
 */
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));