/**
 * @fileoverview Controlador para gerenciar usuários, incluindo criação, busca e atualização de dados.
 * @requires ../services/user.service
 */
import userService from "../services/user.service.js";
/* const mongoose = require("mongoose"); */

/**
 * Cria um novo usuário e o salva no banco de dados.
 * @async
 * @function
 * @param {Object} req - Objeto da requisição.
 * @param {Object} req.body - Corpo da requisição, deve conter os detalhes do usuário.
 * @param {string} req.body.name - Nome do usuário.
 * @param {string} req.body.email - Email do usuário.
 * @param {string} req.body.senha - Senha do usuário.
 * @param {string} req.body.telefone - Telefone do usuário.
 * @param {string} req.body.endereco - Endereço do usuário.
 * @param {Object} res - Objeto de resposta.
 * @returns {Promise<void>}
 */
const create = async (req, res) => {
  try{
    const { name, email, senha, telefone, endereco } = req.body;

    if (!name || !email || !senha || !telefone || !endereco) {
    res.status(400).send({ message: "Preencha todos os campos" })
    }

    const user = await userService.createService(req.body);
    //aqui ele chama a função de user.service?

    if (!user) {
      return res.status(400).send({ message: "Erro ao criar usuário" });
    }

    res.status(201).send({
      message: "Usuário cadastrado com sucesso",
      user: {
        id: user._id,
        name,
        email,
        senha,
        telefone,
        endereco
      },
    });
  } catch (err) {
    res.status(500).send({message: err.message});
  }
};

/**
 * Busca todos os usuários cadastrados no banco de dados.
 * @async
 * @function
 * @param {Object} req - Objeto da requisição.
 * @param {Object} res - Objeto de resposta.
 * @returns {Promise<void>}
 */
const findAll = async (req, res) => {
  try{
    const users = await userService.findAllService();

    if (users.length == 0) {
      return res.status(400).send({ message: "Não há usuários cadastrados." })
    }

    res.send(users)
  } catch(err){
    res.status(500).send({message: err.message});
  }
}

/**
 * Busca um usuário específico com base no ID fornecido na requisição.
 * @async
 * @function
 * @param {Object} req - Objeto da requisição.
 * @param {Object} req.user - Dados do usuário autenticado.
 * @param {Object} res - Objeto de resposta.
 * @returns {Promise<void>}
 */
const findById = async (req, res) => {

/*   if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "ID inválido" })
  } */

  try {
    const user = req.user;

/*   if (!user) {
    return res.status(400).send({ message: "Usuário não encontrado" });
  } */

    res.send(user);
  } catch(err){
      res.status(500).send({message: err.message});
  }
};

/**
 * Atualiza os dados de um usuário com base no ID fornecido na requisição.
 * @async
 * @function
 * @param {Object} req - Objeto da requisição.
 * @param {Object} req.body - Corpo da requisição, pode conter campos para atualização.
 * @param {string} req.body.name - Nome do usuário.
 * @param {string} req.body.email - Email do usuário.
 * @param {string} req.body.telefone - Telefone do usuário.
 * @param {string} req.body.endereco - Endereço do usuário.
 * @param {Object} req.params - Parâmetros da requisição.
 * @param {string} req.params.id - ID do usuário a ser atualizado.
 * @param {Object} res - Objeto de resposta.
 * @returns {Promise<void>}
 */
const update = async (req, res) => {
  try {
    const { name, email, telefone, endereco } = req.body;

    if (!name && !email && !telefone && !endereco) {
      res.status(400).send({ message: "Preencha pelo menos 1 campo para atualizar o cadastro" })
    }

    const {id, user} = req;

/*   if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "ID inválido" })
  } */

/*   const user = await userService.findByIdService(id); */

/*   if (!user) {
    return res.status(400).send({ message: "Usuário não encontrado" });
  } */

    await userService.updateService(
      id,
      name,
      email,
      telefone,
      endereco
    );

    res.send({message: "Usuário atualizado com sucesso"});
  } catch(err) {
    res.status(500).send({message: err.message});
  }
};

export default { create, findAll, findById, update };