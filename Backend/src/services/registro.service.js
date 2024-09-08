import Registro from "../models/registro.js"

const createService = (body) => Registro.create(body);

const findAllService = () => Registro.find();

export {createService, findAllService};