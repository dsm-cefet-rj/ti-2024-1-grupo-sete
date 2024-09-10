/**
 * @fileoverview Controlador para gerenciar operações relacionadas a aluguéis, incluindo a criação, recuperação de todos os aluguéis e aluguéis 
 * por usuário.
 * @requires ../services/aluguel.service
 */
import {createService, findAllService, byUserService} from "../services/aluguel.service.js";

/**
 * Cria um novo aluguel.
 * @async
 * @function
 * @param {Object} req - Objeto da requisição.
 * @param {Object} req.body - Corpo da requisição, deve conter 'valorDia', 'valorTotal', e 'quantidadeDias'.
 * @param {Object} req.params - Parâmetros da requisição, deve conter 'id' do carro.
 * @param {Object} res - Objeto de resposta.
 * @returns {Promise<void>}
 */
const create = async (req, res) => {
    try{
        console.log("Aluguel controller")
        const {valorDia, valorTotal, quantidadeDias} = req.body;
        //console.log("É PREÇO!", precoPorDia) ok
        const {id} = req.params;
        console.log(req.params);

        if(!valorDia || !valorTotal || !quantidadeDias){
            res.status(400).send({ message: "Preencha todos os campos." });
        }

        const aluguel = await createService({
            valorDia,
            valorTotal,//R$$$
            quantidadeDias,
            user: req.userId,
            carro: id
        });
        console.log("\n\nAluguel criado foi esse>\n\n", aluguel);
        res.status(201).send(aluguel);
    }catch(err) {
        res.status(500).send({message: err.message});
    }
};

/**
 * Recupera todos os aluguéis.
 * @async
 * @function
 * @param {Object} req - Objeto da requisição.
 * @param {Object} res - Objeto de resposta.
 * @returns {Promise<void>}
 */
const findAll = async (req, res) => {
    try{
        const aluguel = await findAllService();
        if(!aluguel){
            return res.status(400).send({ message: "Nenhum aluguel foi encontrado"})
        }

        //console.log(aluguel[1].user.name)

        res.send({
            results: aluguel.map((aluguelItem) => ({
                id: aluguelItem._id,
                valorDia: aluguelItem.valorDia,
                valorTotal: aluguelItem.valorTotal,
                quantidadeDias: aluguelItem.quantidadeDias, 
                userId: aluguelItem.user._id,
                carroId: aluguelItem.carro._id,
                modelo: aluguelItem.carro.modelo,
                userEmail: aluguelItem.carro.user.email,
                userName: aluguelItem.carro.user.name,
                userEndereco: aluguelItem.user.endereco,
                //carro: aluguelItem.carro._id,
                // modelo: aluguelItem.carro.modelo,
                // fotoLink1: aluguelItem.fotoLink1,
                // diasAlugado: aluguelItem.diasAlugado,
                // dataCriado: aluguelItem.dataCriado,
            })),
        });

    }catch(err) {
        res.status(500).send({message: err.message});
    }
}

/**
 * Recupera os aluguéis de um usuário específico.
 * @async
 * @function
 * @param {Object} req - Objeto da requisição.
 * @param {Object} res - Objeto de resposta.
 * @returns {Promise<void>}
 */
const byUser = async (req, res) => {
    try{
        const id = req.userId;
        const aluguel = await byUserService(id);

        return res.send({
            results: aluguel.map((aluguelItem) => ({
                id: aluguelItem._id,
                valorDia: aluguelItem.valorDia,
                valorTotal: aluguelItem.valorTotal,
                quantidadeDias: aluguelItem.quantidadeDias, 
                userId: aluguelItem.user._id,
                modelo: aluguelItem.carro.modelo,
                carroId: aluguelItem.carro._id,
                userEmail: aluguelItem.user.email,
                userName: aluguelItem.user.name,
                userEndereco: aluguelItem.user.endereco,
            })),
        });
    }catch(err) {
        res.status(500).send({message: err.message});
    }
};



export default { create, findAll, byUser };