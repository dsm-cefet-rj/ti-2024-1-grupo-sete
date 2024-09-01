import User from "../models/User.js";

//Recebe dados do body e passa para lado direito de => como parâmetro
const createService = (body) => User.create(body);
//.create: método do Schema que cria um novo item dentro desse Schema (padrão)

const findAllService = () => User.find();

const findByIdService = (id) => User.findById(id);

const updateService = (
    id,
    name,
    email,
    senha,
    telefone,
    endereco
) => 
    User.findOneAndUpdate(
    {_id: id},
    {name, email, senha, telefone, endereco}
)

export default {
    createService,
    findAllService,
    findByIdService,
    updateService,
};