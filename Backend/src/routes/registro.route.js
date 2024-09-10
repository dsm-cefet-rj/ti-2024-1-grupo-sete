import express from 'express';
import { create, findAll, byUser } from "../controllers/registro.controller.js"
import {authMiddleware} from '../middlewares/auth.middleware.js';

const router = express.Router();

/**
 * Rota para criar um novo registro.
 * @route POST /{id}
 * @group Records - Operações relacionadas aos registros
 * @param {string} id.path.required - ID do usuário para criar o registro
 * @param {Registro.model} registro.body.required - Dados do registro a serem criados
 * @returns {Registro.model} 201 - Registro criado com sucesso
 * @returns {Error}  400 - Campos obrigatórios não preenchidos
 * @returns {Error}  401 - Autorização negada
 */
router.post("/:id", authMiddleware, create);

/**
 * Rota para obter todos os registros.
 * @route GET /
 * @group Records - Operações relacionadas aos registros
 * @returns {Array.<Registro.model>} 200 - Lista de registros
 * @returns {Error}  401 - Autorização negada
 */
router.get("/", authMiddleware, findAll);

/**
 * Rota para obter registros associados ao usuário autenticado.
 * @route GET /byUser
 * @group Records - Operações relacionadas aos registros
 * @returns {Array.<Registro.model>} 200 - Lista de registros do usuário
 * @returns {Error}  401 - Autorização negada
 */
router.get("/byUser", authMiddleware, byUser);

export default router;
