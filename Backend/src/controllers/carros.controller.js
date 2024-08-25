import {createService, findAllService, countCarros, topCarrosService} from "../services/carros.service.js";
import {ObjectId} from "mongoose";

const create = async (req, res) => {
    try{
        const {modelo, ano, cidade, precoPorDia, detalhes, fotoLink1, diasAlugado, dataCriado} = req.body;

        if(!modelo || !ano || !cidade || !precoPorDia || !detalhes || !fotoLink1){
            res.status(400).send({ message: "Preencha todos os campos" });
        }

        await createService({
            modelo,
            ano,
            cidade, 
            precoPorDia,
            detalhes,
            fotoLink1,
            diasAlugado,
            dataCriado,
            user: req.userId,
        });

        res.send(201);
    }catch(err) {
        res.status(500).send({message: err.message});
    }
}

const findAll = async (req, res) => {
    try{
        let {limit, offset} = req.query;

        limit = Number(limit);
        offset = Number(offset);
    
        if(!limit){
            limit = 5;
        }
    
        if(!offset){
            offset = 0;
        }
    
        const carros = await findAllService(offset, limit);
        const total = await countCarros();
        const currentUrl = req.baseUrl
    
        const next = offset + limit;
        const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;
    
        //Talvez isso nao seja usado
        const previous = offset - limit < 0 ? null : offset - limit;
        const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;
        //ate aqui talvez nao seja usado
    
        if (carros.length == 0) {
            return res.status(400).send({ message: "Não há carros cadastrados." });
        }
    
        //Faz o envio da url com limit e offset para paginacao de dados e uma especie de personalizacao dos atributos do user que criou o carro 
        res.send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,
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

const topCarros = async (req, res) => {
    const carros = await topCarrosService();
    console.log(carros)

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
};

export { create, findAll, topCarros };