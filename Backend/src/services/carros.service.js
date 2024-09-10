import Carros from "../models/Carros.js";

/**
 * Cria um novo documento de carro no banco de dados.
 * @param {Object} body - Dados do carro a serem criados.
 * @param {string} body.modelo - Modelo do carro.
 * @param {string} body.ano - Ano de fabricação do carro.
 * @param {string} body.cidade - Cidade onde o carro está disponível.
 * @param {number} body.precoPorDia - Preço por dia do aluguel do carro.
 * @param {string} body.detalhes - Detalhes adicionais sobre o carro.
 * @param {string} body.fotoLink1 - Link para a foto principal do carro.
 * @param {mongoose.Schema.Types.ObjectId} body.user - ID do usuário que criou o carro.
 * @returns {Promise<mongoose.Document>} - Promessa que resolve para o documento do carro criado.
 */
const createService = (body) => Carros.create(body);

/**
 * Encontra todos os carros, ordenados pelo ID em ordem decrescente, e limita o resultado a 20 carros.
 * @returns {Promise<Array<mongoose.Document>>} - Promessa que resolve para um array de documentos de carros.
 */
const findAllService = () => Carros.find().sort({_id: -1}).populate("user").limit(20);

/**
 * Conta o número total de documentos de carros no banco de dados.
 * @returns {Promise<number>} - Promessa que resolve para o número total de documentos de carros.
 */
const countCarros = () => Carros.countDocuments();

/**
 * Encontra os 3 carros mais recentes, ordenados pelo ID em ordem decrescente.
 * @returns {Promise<Array<mongoose.Document>>} - Promessa que resolve para um array de 3 documentos de carros.
 */
const topCarrosService = () => Carros.find().sort({_id: -1}).populate("user").limit(3);

/**
 * Encontra um carro pelo ID fornecido.
 * @param {mongoose.Schema.Types.ObjectId} id - ID do carro a ser encontrado.
 * @returns {Promise<mongoose.Document|null>} - Promessa que resolve para o documento do carro encontrado ou null se não encontrado.
 */
const findByIdService = (id) => Carros.findById(id).populate("user");

/**
 * Pesquisa carros pelo modelo fornecido, com correspondência parcial e sem diferenciação entre maiúsculas e minúsculas.
 * @param {string} modelo - Modelo do carro a ser pesquisado.
 * @returns {Promise<Array<mongoose.Document>>} - Promessa que resolve para um array de documentos de carros que correspondem à pesquisa.
 */
const searchByModeloService = (modelo) => 
    Carros.find({
        modelo: {$regex: `${modelo || ""}`, $options: "i"},
    })
    .sort({_id: -1})
    .populate("user");

/**
 * Encontra carros criados por um usuário específico.
 * @param {mongoose.Schema.Types.ObjectId} id - ID do usuário cujos carros devem ser encontrados.
 * @returns {Promise<Array<mongoose.Document>>} - Promessa que resolve para um array de documentos de carros criados pelo usuário.
 */
const byUserService = (id) => Carros.find({user: id})
    .sort({_id: -1})
    .populate("user");

/**
 * Atualiza um documento de carro com base no ID fornecido.
 * @param {mongoose.Schema.Types.ObjectId} id - ID do carro a ser atualizado.
 * @param {string} modelo - Modelo do carro.
 * @param {string} ano - Ano de fabricação do carro.
 * @param {string} cidade - Cidade onde o carro está disponível.
 * @param {number} precoPorDia - Preço por dia do aluguel do carro.
 * @param {string} detalhes - Detalhes adicionais sobre o carro.
 * @param {string} fotoLink1 - Link para a foto principal do carro.
 * @param {string} enderecoRetirada - Endereço para retirada do carro.
 * @returns {Promise<mongoose.Document>} - Promessa que resolve para o documento atualizado do carro.
 */
const updateService = (id, modelo, ano, cidade, precoPorDia, detalhes, fotoLink1, enderecoRetirada) => 
    Carros.findOneAndUpdate({_id: id}, {modelo, ano, cidade, precoPorDia, detalhes, fotoLink1, enderecoRetirada},
    {
        rawResult: true,
    } 
    );

/**
 * Remove um carro do banco de dados com base no ID fornecido.
 * @param {mongoose.Schema.Types.ObjectId} id - ID do carro a ser removido. 
 * @returns {Promise<mongoose.Document|null>} - Promessa que resolve para o documento do carro removido ou null se não encontrado.
 */
const apagarCarroService = (id) => Carros.findOneAndDelete({_id: id});

/**
 * Adiciona novos dias ao array 'diasAlugado' de um carro com base no ID fornecido.
 * @param {mongoose.Schema.Types.ObjectId} carroId - ID do carro ao qual os dias devem ser adicionados.
 * @param {Array<Date>} diasAlugadoArray - Array de datas representando os dias em que o carro foi alugado.
 * @returns {Promise<mongoose.Document>} - Promessa que resolve para o documento atualizado do carro.
 */
const diasAlugadoService = (carroId, diasAlugadoArray) => Carros.findByIdAndUpdate(
    {_id: carroId},
    { $push: {diasAlugado: diasAlugadoArray}}
);

export { createService, findAllService, countCarros, topCarrosService, findByIdService, searchByModeloService, byUserService, updateService, apagarCarroService, diasAlugadoService };