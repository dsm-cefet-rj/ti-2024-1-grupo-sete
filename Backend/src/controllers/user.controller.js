import userService from "../services/user.service.js";
/* const mongoose = require("mongoose"); */

const create = async (req, res) => {
  try{
    const { name, username, email, senha, imagem } = req.body;

    if (!name || !username || !email || !senha || !imagem) {
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
        username,
        email,
        senha,
        imagem
      },
    });
  } catch (err) {
    res.status(500).send({message: err.message});
  }
};

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

const update = async (req, res) => {
  try {
    const { name, username, email, senha, imagem } = req.body;

    if (!name && !username && !email && !senha && !imagem) {
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
      username,
      email,
      senha,
      imagem
    );

    res.send({message: "Usuário atualizado com sucesso"});
  } catch(err) {
    res.status(500).send({message: err.message});
  }
};

export default { create, findAll, findById, update };