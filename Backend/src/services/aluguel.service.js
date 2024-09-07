import Aluguel from "../models/Aluguel.js";

const createService = (body) => Aluguel.create(body);

export {createService};