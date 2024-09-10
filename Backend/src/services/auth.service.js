import User from '../models/User.js';
import jwt from 'jsonwebtoken';

/**
 * Procura um usuário pelo email e retorna o documento do usuário com a senha.
 * @param {string} email - Email do usuário a ser encontrado.
 * @returns {Promise<mongoose.Document|null>} - Promessa que resolve para o documento do usuário, incluindo a senha, ou null se não encontrado.
 */
const loginService = (email) => User.findOne({email: email}).select("+senha");

/**
 * Gera um token JWT para um usuário com base no ID fornecido.
 * @param {mongoose.Schema.Types.ObjectId} id - ID do usuário para o qual o token deve ser gerado.
 * @returns {string} - O token JWT gerado.
 */
const generateToken = (id) => jwt.sign({id: id}, "9818f29b6e7219134d39b5f28b49ebba", {expiresIn: 86400});

export { loginService, generateToken };