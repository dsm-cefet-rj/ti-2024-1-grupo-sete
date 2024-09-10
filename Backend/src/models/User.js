import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * Esquema para o modelo de Usuário.
 * O esquema define a estrutura do documento de usuário no MongoDB. Inclui informações sobre o nome, email, senha, telefone, endereço e se o 
 * usuário é um administrador.
 * @typedef {Object} User
 * @property {string} name - Nome do usuário.
 * @property {string} email - Endereço de email do usuário (único e em minúsculas).
 * @property {string} senha - Senha do usuário (não incluída nas respostas por padrão).
 * @property {string} telefone - Número de telefone do usuário.
 * @property {string} endereco - Endereço do usuário.
 * @property {boolean} isAdm - Indica se o usuário é um administrador (false por padrão).
 */
const UserSchema = new mongoose.Schema({

    /**
     * Nome do usuário.
     * @type {String}
     * @required
     */
    name: {
        type: String,
        required: true,
    },

    /**
     * Endereço de email do usuário.
     * @type {String}
     * @required
     * @unique
     * @lowercase
     */
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    /**
     * Senha do usuário.
     * @type {String}
     * @required
     * @select false - Senha não é incluída nas respostas por padrão.
     */
    senha: {
        type: String,
        required: true,
        select: false,
    },

    /**
     * Número de telefone do usuário.
     * @type {String}
     * @required
     */
    telefone: {
        type: String,
        required: true,
    },

    /**
     * Endereço do usuário.
     * @type {String}
     * @required
     */
    endereco: {
      type: String,
      required: true,
    },

    /**
     * Indica se o usuário é um administrador.
     * @type {Boolean}
     * @default false
     * @required
     */
    isAdm: {
        type: Boolean,
        required: true,
        default: false,
    }
});

/**
 * Middleware para criptografar a senha antes de salvar o usuário.
 * Usa bcrypt para gerar um hash da senha antes de salvar o documento no MongoDB.
 * @param {Function} next - Função para continuar para o próximo middleware.
 */
UserSchema.pre("save", async function (next){
    this.senha = await bcrypt.hash(this.senha, 10)
    next();
})

/**
 * Modelo do Usuário.
 * Este modelo é usado para interagir com a coleção 'User' no banco de dados MongoDB.
 * @type {mongoose.Model<User>}
 */
const User = mongoose.model("User", UserSchema)

export default User;
