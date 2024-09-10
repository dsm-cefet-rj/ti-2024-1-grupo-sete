import mongoose from 'mongoose';
import userService from "../services/user.service.js";

/**
 * Middleware para validar o formato do ID fornecido na requisição.
 * Este middleware verifica se o ID fornecido na URL da requisição (`req.params.id`) é um ID válido do MongoDB usando 
 * 'mongoose.Types.ObjectId.isValid()'. Se o ID for inválido, retorna um status 400 com a mensagem "ID inválido". Caso contrário, permite que a 
 * requisição prossiga para o próximo middleware ou rota.
 * @function
 * @param {Object} req - Objeto da requisição.
 * @param {Object} res - Objeto de resposta.
 * @param {Function} next - Função para passar para o próximo middleware ou rota.
 * @returns {void}
 */
export const validId = (req, res, next) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: "ID inválido" })
        }

        next();
    } catch(err){
        res.status(500).send({message: err.message});
    }
};

/**
 * Middleware para validar a existência de um usuário com o ID fornecido na requisição.
 * Este middleware busca um usuário usando o ID fornecido na URL da requisição ('req.params.id') através do serviço de usuários. Se o usuário não 
 * for encontrado, retorna um status 400 com a mensagem "Usuário não encontrado". Caso contrário, adiciona o usuário ao objeto da requisição 
 * ('req.user') e o ID ao objeto da requisição ('req.id'), permitindo que a requisição prossiga para o próximo middleware ou rota.
 * @async
 * @function
 * @param {Object} req - Objeto da requisição.
 * @param {Object} res - Objeto de resposta.
 * @param {Function} next - Função para passar para o próximo middleware ou rota.
 * @returns {void}
 */
export const validUser = async (req, res, next) => {
    try {
        const id  = req.params.id;

        const user = await userService.findByIdService(id);

        if (!user) {
            return res.status(400).send({ message: "Usuário não encontrado" });
        }

        req.id = id
        req.user = user;
        
        next();
    } catch(err){
        res.status(500).send({message: err.message});
    }
};