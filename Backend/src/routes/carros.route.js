import express from 'express';
const route = express.Router();

import {create, findAll, topCarros, findById, searchByModelo, byUser, update, apagarCarro, updateDiasAlugado} from '../controllers/carros.controller.js';
import {authMiddleware} from '../middlewares/auth.middleware.js';

/**
 * Rota para criar um novo carro.
 * @route POST /
 * @group Cars - Operações relacionadas aos carros
 * @param {Carro.model} carro.body.required - Dados do carro a serem criados
 * @returns {Carro.model} 201 - Carro criado com sucesso
 * @returns {Error} 400 - Dados inválidos ou campos obrigatórios não preenchidos
 * @returns {Error} 401 - Autorização negada
 */
route.post("/", authMiddleware, create);

/**
 * Rota para obter todos os carros.
 * @route GET /
 * @group Cars - Operações relacionadas aos carros
 * @returns {Array.<Carro.model>} 200 - Lista de carros
 */
route.get("/", findAll);

/**
 * Rota para obter os carros em destaque (top carros).
 * @route GET /top
 * @group Cars - Operações relacionadas aos carros
 * @returns {Array.<Carro.model>} 200 - Lista dos top carros
 */
route.get("/top", topCarros);

/**
 * Rota para buscar carros pelo modelo.
 * @route GET /search
 * @group Cars - Operações relacionadas aos carros
 * @param {string} modelo.query.required - Modelo do carro a ser pesquisado
 * @returns {Array.<Carro.model>} 200 - Lista de carros que correspondem ao modelo
 */
route.get("/search", searchByModelo);

/**
 * Rota para obter carros associados ao usuário autenticado.
 * @route GET /byUser
 * @group Cars - Operações relacionadas aos carros
 * @returns {Array.<Carro.model>} 200 - Lista de carros do usuário autenticado
 * @returns {Error} 401 - Autorização negada
 */
route.get("/byUser", authMiddleware, byUser);

/**
 * Rota para obter um carro específico pelo ID.
 * @route GET /{id}
 * @group Cars - Operações relacionadas aos carros
 * @param {string} id.path.required - ID do carro a ser buscado
 * @returns {Carro.model} 200 - Carro encontrado
 * @returns {Error} 401 - Autorização negada
 * @returns {Error} 404 - Carro não encontrado
 */
route.get("/:id", authMiddleware, findById);

/**
 * Rota para atualizar um carro específico pelo ID.
 * @route PATCH /{id}
 * @group Cars - Operações relacionadas aos carros
 * @param {string} id.path.required - ID do carro a ser atualizado
 * @param {Carro.model} carro.body.required - Dados do carro a serem atualizados
 * @returns {Carro.model} 200 - Carro atualizado com sucesso
 * @returns {Error} 400 - Dados inválidos ou campos obrigatórios não preenchidos
 * @returns {Error} 401 - Autorização negada
 * @returns {Error} 404 - Carro não encontrado
 */
route.patch("/:id", authMiddleware, update);

/**
 * Rota para apagar um carro específico pelo ID.
 * @route DELETE /{id}
 * @group Cars - Operações relacionadas aos carros
 * @param {string} id.path.required - ID do carro a ser apagado
 * @returns {string} 200 - Mensagem de sucesso
 * @returns {Error} 401 - Autorização negada
 * @returns {Error} 404 - Carro não encontrado
 */
route.delete("/:id", authMiddleware, apagarCarro);

/**
 * Rota para atualizar o número de dias alugado de um carro específico.
 * @route PATCH /diasAlugado/{id}
 * @group Cars - Operações relacionadas aos carros
 * @param {string} id.path.required - ID do carro a ter o número de dias alugado atualizado
 * @param {Object} data.body.required - Dados para atualizar o número de dias alugado
 * @param {number} data.diasAlugado - Número de dias a ser adicionado ao carro
 * @returns {Carro.model} 200 - Carro atualizado com sucesso
 * @returns {Error} 400 - Dados inválidos
 * @returns {Error} 401 - Autorização negada
 * @returns {Error} 404 - Carro não encontrado
 */
route.patch("/diasAlugado/:id", authMiddleware, updateDiasAlugado);


export default route;