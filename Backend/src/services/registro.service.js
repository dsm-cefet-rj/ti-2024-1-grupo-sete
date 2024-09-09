import Registro from "../models/registro.js"

const createService = (body) => Registro.create(body);

const findAllService = () => Registro.find().sort({_id: -1}).populate("user");

const byUserService = (id) => Registro.find({user: id})
    .sort({_id: -1})
    .populate("user");

export {createService, findAllService, byUserService};