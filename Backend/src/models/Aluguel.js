import mongoose from 'mongoose';

/**
 * Esquema para o modelo de Aluguel.
 * O esquema define a estrutura do documento de aluguel no MongoDB. Inclui informações sobre o valor diário do aluguel, o valor total, a quantidade
 * de dias, o usuário que fez o aluguel e o carro alugado. O esquema também referencia os modelos 'User' e 'Carros'.
 * @typedef {Object} Aluguel
 * @property {number} valorDia - Valor diário do aluguel.
 * @property {number} valorTotal - Valor total do aluguel.
 * @property {Array<number>} quantidadeDias - Array com a quantidade de dias do aluguel.
 * @property {mongoose.Schema.Types.ObjectId} user - Referência ao ID do usuário que fez o aluguel.
 * @property {mongoose.Schema.Types.ObjectId} carro - Referência ao ID do carro alugado.
 */
const AluguelSchema = new mongoose.Schema({
    /**
     * Valor diário do aluguel.
     * @type {Number}
     * @required
     */
    valorDia: {
        type: Number,
        require: true,
    },

    /**
     * Valor total do aluguel.
     * @type {Number}
     * @required
     */
    valorTotal: {
        type: Number,
        require: true,
    },

    /**
     * Quantidade de dias do aluguel.
     * @type {Array<number>}
     * @required
     */
    quantidadeDias: {
        type: Array,
        require: true,
    },

    // formaPagamento: {
    //     type: String,
    //     require: true,
    // },

    /**
     * Referência ao usuário que fez o aluguel.
     * @type {mongoose.Schema.Types.ObjectId}
     * @required
     * @ref User
     */
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    /**
     * Referência ao carro alugado.
     * @type {mongoose.Schema.Types.ObjectId}
     * @required
     * @ref Carros
     */
    carro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Carros",
        required: true,
    }
});

/**
 * Modelo do Aluguel.
 * Este modelo é usado para interagir com a coleção 'Aluguel' no banco de dados MongoDB.
 * @type {mongoose.Model<Aluguel>}
 */
const Aluguel = mongoose.model("Aluguel", AluguelSchema)

export default Aluguel;