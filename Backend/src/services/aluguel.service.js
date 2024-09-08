import Aluguel from "../models/Aluguel.js";

const createService = (body) => Aluguel.create(body);

const findAllService = () => Aluguel.find();

export {createService, findAllService};