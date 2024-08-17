import Carros from "../models/Carros.js"

const createService = (body) => Carros.create(body);

const findAllService = () => Carros.find();

export {createService, findAllService};