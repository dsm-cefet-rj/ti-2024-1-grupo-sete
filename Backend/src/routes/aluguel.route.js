import express from 'express';
import aluguelController from '../controllers/aluguel.controller.js';
import {authMiddleware} from '../middlewares/auth.middleware.js';

const router = express.Router();


/**
 * Rota para criar um novo aluguel.
 * @route POST /:id
 * @group Aluguel - Operações relacionadas aos aluguéis
 * @param {string} id.path.required - ID do carro a ser alugado
 * @param {Aluguel.model} aluguel.body.required - Dados do aluguel (valor, quantidade de dias, etc.)
 * @returns {Object} 201 - Aluguel criado com sucesso
 * @returns {Error} 401 - Token não fornecido ou inválido
 * @returns {Error} 400 - Dados inválidos ou campos obrigatórios não preenchidos
 */
router.post("/:id", authMiddleware, aluguelController.create);

/**
 * Rota para listar todos os aluguéis.
 * @route GET /
 * @group Aluguel - Operações relacionadas aos aluguéis
 * @returns {Array.<Aluguel.model>} 200 - Lista de aluguéis
 * @returns {Error} 401 - Token não fornecido ou inválido
 */
router.get("/", authMiddleware, aluguelController.findAll);

/**
 * Rota para listar todos os aluguéis de um usuário específico.
 * @route GET /byUser
 * @group Aluguel - Operações relacionadas aos aluguéis
 * @returns {Array.<Aluguel.model>} 200 - Lista de aluguéis do usuário
 * @returns {Error} 401 - Token não fornecido ou inválido
 */
router.get("/byUser", authMiddleware, aluguelController.byUser);

export default router;

