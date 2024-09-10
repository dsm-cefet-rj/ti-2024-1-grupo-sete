/**
 * @fileoverview Configuração do servidor Express, incluindo a conexão com o banco de dados e a configuração das rotas.
 * @requires express
 * @requires ./src/database/db
 * @requires ./src/routes/user.route
 * @requires ./src/routes/auth.route
 * @requires ./src/routes/carros.route
 */
import express from 'express';
import connectDatabase from './src/database/db.js';
import userRoute from './src/routes/user.route.js';
import authRoute from './src/routes/auth.route.js';
import carrosRoute from './src/routes/carros.route.js';

/**
 * Porta na qual o servidor será executado.
 * @type {number}
 */
const port = 5000;

/**
 * Instância do aplicativo Express.
 * @type {Object}
 */
const app = express();

/**
 * Conecta ao banco de dados.
 * @function
 */
connectDatabase();

/**
 * Middleware para permitir o uso de JSON nas requisições.
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
 * Inicia o servidor e ouve na porta especificada.
 * @function
 * @param {number} port - Porta onde o servidor está escutando.
 */
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));