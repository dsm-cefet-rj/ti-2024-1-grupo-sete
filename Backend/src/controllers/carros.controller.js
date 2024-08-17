import {createService, findAllService} from "../services/carros.service.js"
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
            user: { _id: "66c07fb2d5c9cb46c4f66281" },
        })

        res.send(201);
    }catch(err) {
        res.status(500).send({message: err.message});
    }
}

const findAll = async (req, res) => {
    const carros = await findAllService();
    if (carros.length == 0) {
        return res.status(400).send({ message: "Não há carros cadastrados." });
    }
    res.send(carros);
};

export { create, findAll };