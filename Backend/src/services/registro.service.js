import Registro from "../models/registro.js"

const createService = (body) => Registro.create(body);

export {createService};