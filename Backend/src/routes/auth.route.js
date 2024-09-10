import { Router } from 'express';
const router = Router();

import {login} from '../controllers/auth.controller.js'

/**
 * Rota para autenticação de usuário (login).
 * @route POST /
 * @group Auth - Operações relacionadas à autenticação
 * @param {Auth.model} auth.body.required - Dados de autenticação do usuário (email e senha)
 * @returns {Object} 200 - Token de autenticação e informações do usuário
 * @returns {Error} 400 - Dados inválidos ou campos obrigatórios não preenchidos
 * @returns {Error} 401 - Credenciais inválidas
 */
router.post("/", login)

export default router;