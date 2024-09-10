import express from 'express';
import userController from '../controllers/user.controller.js';
import {validId, validUser} from "../middlewares/global.middlewares.js";

const route = express.Router();

/**
 * Rota para criar um novo usuário.
 * @route POST /api/users
 * @group Users - Operações relacionadas aos usuários
 * @param {User.model} user.body.required - Dados do usuário a serem criados.
 * @returns {object} 201 - Usuário criado com sucesso
 * @returns {Error}  400 - Erro ao criar usuário
 */
route.post("/", userController.create);

/**
 * Rota para obter todos os usuários.
 * @route GET /api/users
 * @group Users - Operações relacionadas aos usuários
 * @returns {Array.<User.model>} 200 - Lista de todos os usuários
 * @returns {Error}  500 - Erro interno do servidor
 */
route.get("/", userController.findAll);

/**
 * Rota para obter um usuário específico por ID.
 * @route GET /api/users/{id}
 * @group Users - Operações relacionadas aos usuários
 * @param {string} id.path.required - ID do usuário a ser encontrado
 * @returns {User.model} 200 - Usuário encontrado
 * @returns {Error}  400 - ID inválido ou usuário não encontrado
 * @returns {Error}  500 - Erro interno do servidor
 */
route.get("/:id", validId, validUser, userController.findById);

/**
 * Rota para atualizar os dados de um usuário específico.
 * @route PATCH /api/users/{id}
 * @group Users - Operações relacionadas aos usuários
 * @param {string} id.path.required - ID do usuário a ser atualizado
 * @param {User.model} user.body - Dados do usuário a serem atualizados
 * @returns {object} 200 - Usuário atualizado com sucesso
 * @returns {Error}  400 - ID inválido ou erro ao atualizar usuário
 * @returns {Error}  500 - Erro interno do servidor
 */
route.patch("/:id", validId, validUser,userController.update);

export default route;