import mongoose from 'mongoose';

/**
 * Esquema para o modelo de Registro.
 * O esquema define a estrutura do documento de registro de aluguel no MongoDB. Inclui informações sobre o valor diário, valor total, quantidade de
 * dias, data do pagamento, forma de pagamento e o usuário que fez o registro.
 * @typedef {Object} Registro
 * @property {number} valorDia - Valor do aluguel por dia.
 * @property {number} valorTotal - Valor total do aluguel.
 * @property {Array<number>} quantidadeDias - Array com a quantidade de dias que o carro foi alugado.
 * @property {Date} [dataDoPagamento] - Data do pagamento (default: data e hora atual).
 * @property {string} formaPagamento - Forma de pagamento utilizada.
 * @property {mongoose.Schema.Types.ObjectId} user - Referência ao ID do usuário que fez o registro.
 * @property {mongoose.Schema.Types.ObjectId} [carro] - Referência ao ID do carro alugado (comentado por enquanto).
 */
const RegistroSchema = new mongoose.Schema({
  //nome: { type: String, required: true },
  //carro: { type: String, required: true },

  /**
   * Valor do aluguel por dia.
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
   * Array com a quantidade de dias que o carro foi alugado.
   * @type {Array<number>}
   * @required
   */
  quantidadeDias: {
    type: Array,
    required: true
  },

  /**
   * Data do pagamento.
   * @type {Date}
   * @default Date.now()
   */
  dataDoPagamento: {
    type: Date,
    default: Date.now(),
  },

  /**
   * Forma de pagamento utilizada.
   * @type {String}
   * @required
   */
  formaPagamento: {
    type: String,
    require: true,
  },
  modeloRegistro: {
    type: String,
    required: true
  },

  /**
   * Referência ao usuário que fez o registro.
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
   * Referência ao carro alugado (comentado por enquanto).
   * @type {mongoose.Schema.Types.ObjectId}
   * @ref Carros
   */
  // carro: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Carros",
  //   required: true,
  // }
});

/**
 * Modelo do Registro.
 * Este modelo é usado para interagir com a coleção 'Registro' no banco de dados MongoDB.
 * @type {mongoose.Model<Registro>}
 */
const Registro = mongoose.model("Registro", RegistroSchema)

export default Registro;
