import Registro from "../models/registro.js"

/**
 * Cria um novo documento de registro no banco de dados.
 * @param {Object} body - Dados do registro a serem criados.
 * @param {number} body.valorDia - Valor do aluguel por dia.
 * @param {number} body.valorTotal - Valor total do aluguel.
 * @param {Array<Date>} body.quantidadeDias - Array de datas representando a quantidade de dias de aluguel.
 * @param {Date} [body.dataDoPagamento] - Data do pagamento. Se não fornecido, será definido para a data atual.
 * @param {string} body.formaPagamento - Forma de pagamento utilizada.
 * @param {mongoose.Schema.Types.ObjectId} body.user - ID do usuário associado ao registro.
 * @returns {Promise<mongoose.Document>} - Promessa que resolve para o documento do registro criado.
 */
const createService = (body) => Registro.create(body);

/**
 * Encontra todos os registros, ordenados pelo ID em ordem decrescente.
 * @returns {Promise<Array<mongoose.Document>>} - Promessa que resolve para um array de documentos de registros.
 */
const findAllService = () => Registro.find().sort({_id: -1}).populate("user");

/**
 * Encontra todos os registros associados a um usuário específico.
 * @param {mongoose.Schema.Types.ObjectId} id - ID do usuário cujos registros devem ser encontrados.
 * @returns {Promise<Array<mongoose.Document>>} - Promessa que resolve para um array de documentos de registros associados ao usuário.
 */
const byUserService = (id) => Registro.find({user: id})
    .sort({_id: -1})
    .populate("user");

export {createService, findAllService, byUserService};