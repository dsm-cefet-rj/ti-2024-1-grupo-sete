/**
 * @fileoverview Controlador para gerenciar carros, incluindo criação, busca, atualização e exclusão de registros de carros.
 * @requires ../services/carros.service
 * @requires mongoose
 */
import {createService, findAllService, countCarros, topCarrosService, findByIdService, searchByModeloService, byUserService, updateService, apagarCarroService, diasAlugadoService} from "../services/carros.service.js";
import {ObjectId} from "mongoose";

/**
 * Cria um novo carro e o salva no banco de dados.
 * @async
 * @function
 * @param {Object} req - Objeto da requisição.
 * @param {Object} req.body - Corpo da requisição, deve conter os detalhes do carro.
 * @param {string} req.body.modelo - Modelo do carro.
 * @param {number} req.body.ano - Ano do carro.
 * @param {string} req.body.cidade - Cidade onde o carro está localizado.
 * @param {number} req.body.precoPorDia - Preço por dia do aluguel.
 * @param {string} req.body.detalhes - Detalhes adicionais sobre o carro.
 * @param {string} req.body.fotoLink1 - URL da foto do carro.
 * @param {number} [req.body.diasAlugado] - Número de dias que o carro foi alugado.
 * @param {Date} [req.body.dataCriado] - Data de criação do registro do carro.
 * @param {Object} res - Objeto de resposta.
 * @returns {Promise<void>}
 */
const create = async (req, res) => {
    try{
        const {modelo, ano, cidade, precoPorDia, detalhes, fotoLink1, enderecoRetirada, diasAlugado, dataCriado} = req.body;
        //console.log("É PREÇO!", precoPorDia) ok

        if(!modelo || !ano || !cidade || !precoPorDia || !detalhes || !fotoLink1 || !enderecoRetirada){
            res.status(400).send({ message: "Preencha todos os campos" });
        }

        

        const carro = await createService({
            modelo,
            ano,
            cidade, 
            precoPorDia,
            detalhes,
            fotoLink1,
            enderecoRetirada,
            diasAlugado,
            dataCriado,
            user: req.userId,
            //req.userId está em authMiddleware
        });
        //console.log("Requisição okay\n\n\n\n", carro);
        res.status(201).send(carro);
    }catch(err) {
        res.status(500).send({message: err.message});
    }
}

/**
 * Busca todos os carros cadastrados no banco de dados.
 * @async
 * @function
 * @param {Object} req - Objeto da requisição.
 * @param {Object} res - Objeto de resposta.
 * @returns {Promise<void>}
 */
const findAll = async (req, res) => {
    try{
        //let {limit, offset} = req.query;

        //limit = Number(limit);
        //offset = Number(offset);
    
        //if(!limit){
        //    limit = 5;
        //}
    
        //if(!offset){
        //    offset = 0;
        //}
    
        const carros = await findAllService();
        if(!carros){
            return res.status(400).send({ message: "Não há carros cadastrados" });
        }

        //const total = await countCarros();
        
        //const currentUrl = req.baseUrl
        //const next = offset + limit;
        //const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;
    
        //Talvez isso nao seja usado
        //const previous = offset - limit < 0 ? null : offset - limit;
        //const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;
        //ate aqui talvez nao seja usado
    
        // if (carros.length == 0) {
        //     return res.status(400).send({ message: "Não há carros cadastrados." });
        // }
    
        //Faz o envio da url com limit e offset para paginacao de dados e uma especie de personalizacao dos atributos do user que criou o carro 
        res.send({
            results: carros.map((carrosItem) => ({
                id: carrosItem._id,
                modelo: carrosItem.modelo,
                ano: carrosItem.ano,
                cidade: carrosItem.cidade, 
                precoPorDia: carrosItem.precoPorDia,
                detalhes: carrosItem.detalhes,
                fotoLink1: carrosItem.fotoLink1,
                enderecoRetirada: carrosItem.enderecoRetirada,
                diasAlugado: carrosItem.diasAlugado,
                dataCriado: carrosItem.dataCriado,
                userName: carrosItem.user.name,
                userEndereco: carrosItem.user.endereco,
                userEmail: carrosItem.user.email,
            })),
        });
    }catch(err) {
        res.status(500).send({message: err.message});
    }
    //     res.send({
    //         nextUrl,
    //         previousUrl,
    //         limit,
    //         offset,
    //         total,
    //         results: carros.map((carrosItem) => ({
    //             id: carrosItem._id,
    //             modelo: carrosItem.modelo,
    //             ano: carrosItem.ano,
    //             cidade: carrosItem.cidade, 
    //             precoPorDia: carrosItem.precoPorDia,
    //             detalhes: carrosItem.detalhes,
    //             fotoLink1: carrosItem.fotoLink1,
    //             diasAlugado: carrosItem.diasAlugado,
    //             dataCriado: carrosItem.dataCriado,
    //             userName: carrosItem.user.name,
    //             userEndereco: carrosItem.user.endereco,
    //             userEmail: carrosItem.user.email,
    //         })),
    //     });
    // }catch(err) {
    //     res.status(500).send({message: err.message});
    // }
};

/**
 * Busca os carros mais populares no banco de dados.
 * @async
 * @function
 * @param {Object} req - Objeto da requisição.
 * @param {Object} res - Objeto de resposta.
 * @returns {Promise<void>}
 */
const topCarros = async (req, res) => {
    try{
        const carros = await topCarrosService();
        console.log(carros);

        if(!carros){
            return res.status(400).send({ message: "Não há carros cadastrados" });
        }

        res.send({
            results: carros.map((carrosItem) => ({
                id: carrosItem._id,
                modelo: carrosItem.modelo,
                ano: carrosItem.ano,
                cidade: carrosItem.cidade, 
                precoPorDia: carrosItem.precoPordia,
                detalhes: carrosItem.detalhes,
                fotoLink1: carrosItem.fotoLink1,
                enderecoRetirada: carrosItem.enderecoRetirada,
                diasAlugado: carrosItem.diasAlugado,
                dataCriado: carrosItem.dataCriado,
                userName: carrosItem.user.name,
                // userEndereco: carrosItem.user.endereco,
                userEmail: carrosItem.user.email,
            })),
        });
    }catch(err) {
        res.status(500).send({message: err.message});
    }
};

/**
 * Busca um carro específico pelo seu ID.
 * @async
 * @function
 * @param {Object} req - Objeto da requisição.
 * @param {Object} req.params - Parâmetros da requisição.
 * @param {string} req.params.id - ID do carro a ser buscado.
 * @param {Object} res - Objeto de resposta.
 * @returns {Promise<void>}
 */
const findById = async (req, res) => {
    try{
        const {id} = req.params;
        const carros = await findByIdService(id);
        //console.log(carros.user.name)

        return res.send({
            carros: {
                id: carros._id,
                modelo: carros.modelo,
                ano: carros.ano,
                cidade: carros.cidade, 
                precoPorDia: carros.precoPorDia,
                detalhes: carros.detalhes,
                fotoLink1: carros.fotoLink1,
                enderecoRetirada: carros.enderecoRetirada,
                diasAlugado: carros.diasAlugado,
                dataCriado: carros.dataCriado,
                userName: carros.user.name,
                // userEndereco: carrosItem.user.endereco,
                userEmail: carros.user.email,
            },
        });
    }catch(err) {
        res.status(500).send({message: err.message});
    }
};

/**
 * Busca carros pelo modelo.
 * @async
 * @function
 * @param {Object} req - Objeto da requisição.
 * @param {Object} req.query - Consultas da requisição.
 * @param {string} req.query.modelo - Modelo do carro a ser buscado.
 * @param {Object} res - Objeto de resposta.
 * @returns {Promise<void>}
 */
const searchByModelo = async (req, res) => {
    try{
        const {modelo} = req.query;

        const carros = await searchByModeloService(modelo);
        console.log(carros);
        if(carros.length === 0){
            return res.status(400).send({ message: "Não há carros cadastrados" });
        }

        return res.send({
            results: carros.map((carrosItem) => ({
                id: carrosItem._id,
                modelo: carrosItem.modelo,
                ano: carrosItem.ano,
                cidade: carrosItem.cidade, 
                precoPorDia: carrosItem.precoPorDia,
                detalhes: carrosItem.detalhes,
                fotoLink1: carrosItem.fotoLink1,
                enderecoRetirada: carrosItem.enderecoRetirada,
                diasAlugado: carrosItem.diasAlugado,
                dataCriado: carrosItem.dataCriado,
                userName: carrosItem.user.name,
                // userEndereco: carrosItem.user.endereco,
                userEmail: carrosItem.user.email,
            })),
        });
    }catch(err) {
        res.status(500).send({message: err.message});
    }
};

/**
 * Busca carros pertencentes a um usuário específico.
 * @async
 * @function
 * @param {Object} req - Objeto da requisição.
 * @param {Object} res - Objeto de resposta.
 * @returns {Promise<void>}
 */
const byUser = async (req, res) => {
    try{
        const id = req.userId;
        const carros = await byUserService(id);

        return res.send({
            results: carros.map((carrosItem) => ({
                id: carrosItem._id,
                modelo: carrosItem.modelo,
                ano: carrosItem.ano,
                cidade: carrosItem.cidade, 
                precoPorDia: carrosItem.precoPorDia,
                detalhes: carrosItem.detalhes,
                fotoLink1: carrosItem.fotoLink1,
                enderecoRetirada: carrosItem.enderecoRetirada,
                diasAlugado: carrosItem.diasAlugado,
                dataCriado: carrosItem.dataCriado,
                userName: carrosItem.user.name,
                // userEndereco: carrosItem.user.endereco,
                userEmail: carrosItem.user.email,
            })),
        });
    }catch(err) {
        res.status(500).send({message: err.message});
    }
};

/**
 * Atualiza as informações de um carro específico.
 * @async
 * @function
 * @param {Object} req - Objeto da requisição.
 * @param {Object} req.body - Corpo da requisição, deve conter os campos a serem atualizados.
 * @param {string} [req.body.modelo] - Novo modelo do carro.
 * @param {number} [req.body.ano] - Novo ano do carro.
 * @param {string} [req.body.cidade] - Nova cidade do carro.
 * @param {number} [req.body.precoPorDia] - Novo preço por dia do aluguel.
 * @param {string} [req.body.detalhes] - Novos detalhes sobre o carro.
 * @param {string} [req.body.fotoLink1] - Novo URL da foto do carro.
 * @param {Object} req.params - Parâmetros da requisição.
 * @param {string} req.params.id - ID do carro a ser atualizado.
 * @param {Object} res - Objeto de resposta.
 * @returns {Promise<void>}
 */
const update = async (req, res) => {
    try{
        //Atributos do carro que serão atualizados (não necessariamente todos, mas pelo menos 1)
        const {modelo, ano, cidade, precoPorDia, detalhes, fotoLink1, enderecoRetirada} = req.body;
        const {id} = req.params;

        if(!modelo && !ano && !cidade && !precoPorDia && !detalhes && !fotoLink1 && !enderecoRetirada){
            res.status(400).send({ message: "Preencha pelo menos 1 campo para editar o seu carro" });
        }

        const carros = await findByIdService(id);

        //Compara o id do usuário que criou o(s) carro(s) com o id de quem está logado(userId)
        if(String(carros.user._id) !== req.userId){
            res.status(400).send({ message: "Você não pode editar este carro" });
        }

        await updateService(id, modelo, ano, cidade, precoPorDia, detalhes, fotoLink1, enderecoRetirada);

        return res.send({carros, message: "Carro editado com sucesso"});
    }catch(err) {
        res.status(500).send({message: err.message});
    }
};

/**
 * Remove um carro específico do banco de dados.
 * @async
 * @function
 * @param {Object} req - Objeto da requisição.
 * @param {Object} req.params - Parâmetros da requisição.
 * @param {string} req.params.id - ID do carro a ser removido.
 * @param {Object} res - Objeto de resposta.
 * @returns {Promise<void>}
 */
const apagarCarro = async (req, res) => {
    try{
        const {id} = req.params;

        const carros = await findByIdService(id);

        //Compara o id do usuário que criou o(s) carro(s) com o id de quem está logado(userId)
        if(String(carros.user._id) !== req.userId){
            res.status(400).send({ message: "Você não pode deletar este carro" });
        }

        await apagarCarroService(id);

        return res.send({message: "Carro deletado com sucesso"});

    }catch(err) {
        res.status(500).send({message: err.message});
    }
};

/**
 * Atualiza os dias de aluguel de um carro.
 * @async
 * @function
 * @param {Object} req - Objeto da requisição.
 * @param {Object} req.body - Corpo da requisição, deve conter o ID do carro e o array de dias de aluguel.
 * @param {string} req.body.carroId - ID do carro a ser atualizado.
 * @param {number[]} req.body.diasAlugadoArray - Array de dias de aluguel a serem atualizados.
 * @param {Object} res - Objeto de resposta.
 * @returns {Promise<void>}
 */
const updateDiasAlugado = async (req, res) => {
    try{
        const {carroId, diasAlugadoArray} = req.body; //Mdnar alguelId em body no criaAluguelServices (Front)

        console.log("\ncarroId:", carroId);
        console.log("\ndiasAlugadoArray:", diasAlugadoArray);

        const CarroDiasAlugadoUpdated = await diasAlugadoService(carroId, diasAlugadoArray);
        console.log(CarroDiasAlugadoUpdated);
        res.send(CarroDiasAlugadoUpdated);
    }catch(err) {
        res.status(500).send({message: err.message});
    }


};

export { create, findAll, topCarros, findById, searchByModelo, byUser, update, apagarCarro, updateDiasAlugado };