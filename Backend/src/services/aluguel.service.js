import Aluguel from "../models/Aluguel.js";

const createService = (body) => Aluguel.create(body);

const findAllService = () => Aluguel.find();

const findByIdService = (id) => Aluguel.findById(id).populate("user");

//Procura Aluguel por meio de 1 user 
const byUserService = (id) => Aluguel.find({user: id})
    .sort({_id: -1})
    .populate("user");


export {createService, findAllService, findByIdService, byUserService};