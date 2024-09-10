import mongoose from 'mongoose';

/**
 * Esquema para o modelo de Carros.
 * O esquema define a estrutura do documento de carro no MongoDB. Inclui informações sobre o modelo do carro, ano, cidade, preço diário, detalhes, 
 * links das fotos, dias alugado, data de criação e o usuário que cadastrou o carro.
 * O esquema também referencia o modelo 'User'.
 * @typedef {Object} Carros
 * @property {string} modelo - Modelo do carro.
 * @property {string} ano - Ano de fabricação do carro.
 * @property {string} cidade - Cidade onde o carro está disponível.
 * @property {number} precoPorDia - Preço do aluguel por dia.
 * @property {string} detalhes - Detalhes adicionais sobre o carro.
 * @property {string} fotoLink1 - Link para a foto principal do carro.
 * @property {Array<number>} [diasAlugado] - Array com os dias em que o carro foi alugado.
 * @property {Date} [dataCriado] - Data em que o carro foi cadastrado (default: data e hora atual).
 * @property {mongoose.Schema.Types.ObjectId} user - Referência ao ID do usuário que cadastrou o carro.
 */
const CarrosSchema = new mongoose.Schema({

    /**
     * Modelo do carro.
     * @type {String}
     * @required
     */
    modelo: {
        type: String,
        require: true,
    },

    /**
     * Ano de fabricação do carro.
     * @type {String}
     * @required
     */
    ano: {
        type: String,
        require: true,
    },

    /**
     * Cidade onde o carro está disponível.
     * @type {String}
     * @required
     */
    cidade: {
        type: String,
        require: true,
    },

    /**
     * Preço do aluguel por dia.
     * @type {Number}
     * @required
     */
    precoPorDia: {
        type: Number,
        require: true,
    },

    /**
     * Detalhes adicionais sobre o carro.
     * @type {String}
     * @required
     */
    detalhes: {
        type: String,
        require: true,
    },

    /**
     * Link para a foto principal do carro.
     * @type {String}
     * @required
     */
    fotoLink1: {
        type: String,
        require: true,
    },

    /**
     * Endereço para retirada do carro.
     * @type {String}
     * @required
     */
    enderecoRetirada: {
        type: String,
        require: true,
    }, 

    /**
     * Array com os dias em que o carro foi alugado.
     * @type {Array<Date>}
     */
    diasAlugado: {
        type: Array,
    },

    /**
     * Data em que o carro foi cadastrado.
     * @type {Date}
     * @default Date.now()
     */
    dataCriado: {
        type: Date,
        default: Date.now(),
    },

/**
     * Referência ao usuário que cadastrou o carro.
     * @type {mongoose.Schema.Types.ObjectId}
     * @required
     * @ref User
     */
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});


/**
 * Modelo do Carros.
 * Este modelo é usado para interagir com a coleção 'Carros' no banco de dados MongoDB.
 * @type {mongoose.Model<Carros>}
 */
const Carros = mongoose.model("Carros", CarrosSchema)

export default Carros;