import Aluguel from "../models/Aluguel.js";

const createService = (body) => Aluguel.create(body);

const findAllService = () => {
    return Aluguel.find()
        .sort({ _id: -1 })
        .populate({
            path: 'user', // Popula o campo 'user' em Aluguel
            select: 'name email endereco' // Seleciona os campos desejados do usuário
        })
        .populate({
            path: 'carro', // Popula o campo 'carro' em Aluguel
            select: 'modelo cidade user', // Inclui o campo 'user' dentro de carro
            populate: {
                path: 'user', // Popula o campo 'user' dentro de carro
                select: 'name' // Seleciona apenas o campo 'name' do usuário associado ao carro
            }
        });
};

const findByIdService = (id) => Aluguel.findById(id).populate("user");

//Procura Aluguel por meio de 1 user 
const byUserService = (id) => Aluguel.find({user: id})
    .sort({_id: -1})
    .populate("user")
    .populate({
        path: 'carro', // Popula o campo 'carro' em Aluguel
        select: 'modelo cidade user', // Inclui o campo 'user' dentro de carro
    });


export {createService, findAllService, findByIdService, byUserService};