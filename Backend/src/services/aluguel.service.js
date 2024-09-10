import Aluguel from "../models/Aluguel.js";

/**
 * Cria um novo documento de aluguel no banco de dados.
 * @param {Object} body - Dados para criar o novo documento de aluguel.
 * @param {number} body.valorDia - Valor por dia do aluguel.
 * @param {number} body.valorTotal - Valor total do aluguel.
 * @param {Array} body.quantidadeDias - Quantidade de dias do aluguel.
 * @param {Date} [body.dataDoPagamento] - Data do pagamento. Se não fornecida, será a data atual.
 * @param {string} body.formaPagamento - Forma de pagamento utilizada.
 * @param {mongoose.Schema.Types.ObjectId} body.user - ID do usuário associado ao aluguel.
 * @param {mongoose.Schema.Types.ObjectId} body.carro - ID do carro associado ao aluguel.
 * @returns {Promise<mongoose.Document>} - Promessa que resolve para o novo documento de aluguel.
 */
const createService = (body) => Aluguel.create(body);

/**
 * Recupera todos os documentos de aluguel do banco de dados, ordenados por data de criação (do mais recente para o mais antigo).
 * Popula os campos relacionados a 'user' e 'carro', incluindo informações adicionais de cada um.
 * @returns {Promise<mongoose.Document[]>} - Promessa que resolve para uma lista de documentos de aluguel.
 */
const findAllService = () => {
    return Aluguel.find()
        .sort({ _id: -1 })
        .populate({
            path: 'user', // Popula o campo 'user' em Aluguel
            select: 'name email endereco' // Seleciona os campos desejados do usuário
        })
        .populate({
            path: 'carro', // Popula o campo 'carro' em Aluguel
            select: 'modelo cidade user', // Inclui o campo 'user' dentro de carro
            populate: {
                path: 'user', // Popula o campo 'user' dentro de carro
                select: 'name' // Seleciona apenas o campo 'name' do usuário associado ao carro
            }
        });
};

/**
 * Recupera um documento de aluguel pelo ID.
 * Popula o campo 'user' associado ao aluguel.
 * @param {mongoose.Schema.Types.ObjectId} id - ID do documento de aluguel a ser recuperado.
 * @returns {Promise<mongoose.Document|null>} - Promessa que resolve para o documento de aluguel ou null se não encontrado.
 */
const findByIdService = (id) => Aluguel.findById(id).populate("user");

/**
 * Recupera todos os documentos de aluguel associados a um usuário específico.
 * Popula os campos relacionados a 'user' e 'carro'.
 * @param {mongoose.Schema.Types.ObjectId} id - ID do usuário cujos aluguéis devem ser recuperados.
 * @returns {Promise<mongoose.Document[]>} - Promessa que resolve para uma lista de documentos de aluguel.
 */
const byUserService = (id) => Aluguel.find({user: id})
    .sort({_id: -1})
    .populate("user")
    .populate({
        path: 'carro', // Popula o campo 'carro' em Aluguel
        select: 'modelo cidade user', // Inclui o campo 'user' dentro de carro
    });


export {createService, findAllService, findByIdService, byUserService};