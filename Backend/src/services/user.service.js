import User from "../models/User.js";

/**
 * Cria um novo documento de usuário no banco de dados.
 * @param {Object} body - Dados do usuário a serem criados.
 * @param {string} body.name - Nome do usuário.
 * @param {string} body.email - Email do usuário.
 * @param {string} body.senha - Senha do usuário.
 * @param {string} body.telefone - Telefone do usuário.
 * @param {string} body.endereco - Endereço do usuário.
 * @param {boolean} [body.isAdm=false] - Indica se o usuário é um administrador. O padrão é 'false'.
 * @returns {Promise<mongoose.Document>} - Promessa que resolve para o documento do usuário criado.
 */
const createService = (body) => User.create(body);
//.create: método do Schema que cria um novo item dentro desse Schema (padrão)

/**
 * Encontra todos os usuários no banco de dados.
 * @returns {Promise<Array<mongoose.Document>>} - Promessa que resolve para um array de documentos de usuários.
 */
const findAllService = () => User.find();

/**
 * Encontra um usuário pelo ID.
 * @param {mongoose.Schema.Types.ObjectId} id - ID do usuário a ser encontrado.
 * @returns {Promise<mongoose.Document|null>} - Promessa que resolve para o documento do usuário encontrado, ou `null` se não encontrado.
 */
const findByIdService = (id) => User.findById(id);

/**
 * Atualiza os dados de um usuário específico.
 * @param {mongoose.Schema.Types.ObjectId} id - ID do usuário a ser atualizado.
 * @param {string} [name] - Novo nome do usuário.
 * @param {string} [email] - Novo email do usuário.
 * @param {string} [telefone] - Novo telefone do usuário.
 * @param {string} [endereco] - Novo endereço do usuário.
 * @returns {Promise<mongoose.Document|null>} - Promessa que resolve para o documento do usuário atualizado, ou 'null' se não encontrado.
 */
const updateService = (
    id,
    name,
    email,
    telefone,
    endereco
) => 
    User.findOneAndUpdate(
    {_id: id},
    {name, email, telefone, endereco}
)

export default {
    createService,
    findAllService,
    findByIdService,
    updateService,
};