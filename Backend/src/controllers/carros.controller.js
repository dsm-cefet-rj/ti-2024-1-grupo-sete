import {createService, findAllService, countCarros, topCarrosService, findByIdService, searchByModeloService, byUserService, updateService, apagarCarroService} from "../services/carros.service.js";
import {ObjectId} from "mongoose";

const create = async (req, res) => {
    try{
        const {modelo, ano, cidade, precoPorDia, detalhes, fotoLink1, diasAlugado, dataCriado} = req.body;
        //console.log("É PREÇO!", precoPorDia) ok

        if(!modelo || !ano || !cidade || !precoPorDia || !detalhes || !fotoLink1){
            res.status(400).send({ message: "Preencha todos os campos" });
        }

        const carro = await createService({
            modelo,
            ano,
            cidade, 
            precoPorDia,
            detalhes,
            fotoLink1,
            diasAlugado,
            dataCriado,
            user: req.userId,
            //req.userId está em authMiddleware
        });
        console.log("Requisição okay\n\n\n\n", carro);
        res.status(201).send(carro);
    }catch(err) {
        res.status(500).send({message: err.message});
    }
}

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
    //             precoPorDia: carrosItem.precoPordia,
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

const findById = async (req, res) => {
    try{
        const {id} = req.params;
        const carros = await findByIdService(id);

        return res.send({
            carros: {
                id: carros._id,
                modelo: carros.modelo,
                ano: carros.ano,
                cidade: carros.cidade, 
                precoPorDia: carros.precoPordia,
                detalhes: carros.detalhes,
                fotoLink1: carros.fotoLink1,
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
                precoPorDia: carrosItem.precoPordia,
                detalhes: carrosItem.detalhes,
                fotoLink1: carrosItem.fotoLink1,
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

//Procura carros por meio de 1 user 
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
                precoPorDia: carrosItem.precoPordia,
                detalhes: carrosItem.detalhes,
                fotoLink1: carrosItem.fotoLink1,
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

const update = async (req, res) => {
    try{
        //Atributos do carro que serão atualizados (não necessariamente todos, mas pelo menos 1)
        const {modelo, ano, cidade, precoPorDia, detalhes, fotoLink1, diasAlugado} = req.body;
        const {id} = req.params;

        if(!modelo && !ano && !cidade && !precoPorDia && !detalhes && !fotoLink1 && !diasAlugado){
            res.status(400).send({ message: "Preencha pelo menos 1 campo para editar o seu carro" });
        }

        const carros = await findByIdService(id);

        //Compara o id do usuário que criou o(s) carro(s) com o id de quem está logado(userId)
        if(String(carros.user._id) !== req.userId){
            res.status(400).send({ message: "Você não pode editar este carro" });
        }

        await updateService(id, modelo, ano, cidade, precoPorDia, detalhes, fotoLink1, diasAlugado);

        return res.send({message: "Carro editado com sucesso"});
    }catch(err) {
        res.status(500).send({message: err.message});
    }
};

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

export { create, findAll, topCarros, findById, searchByModelo, byUser, update, apagarCarro };