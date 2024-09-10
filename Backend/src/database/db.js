/**
 * @fileoverview Configura e realiza a conexão com o banco de dados MongoDB usando Mongoose.
 * @requires mongoose
 * @requires dotenv
 */
import mongoose from 'mongoose';
// import "dotenv/config";
import dotenv from 'dotenv';
dotenv.config();

/**
 * Conecta ao banco de dados MongoDB usando a URI fornecida nas variáveis de ambiente.
 * Utiliza o Mongoose para gerenciar a conexão com o banco de dados.
 * @function
 * @async
 * @returns {Promise<void>}
 */
const connectDatabase = () => {
    console.log("Espere conectar com o database")

    mongoose.connect(
        process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}
    )
    .then(() => console.log("MongoDB Atlas conectado"))
    .catch((error) => console.log(error));
};

export default connectDatabase;