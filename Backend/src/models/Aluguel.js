import mongoose from 'mongoose';

const AluguelSchema = new mongoose.Schema({
    valorDia: {
        type: Number,
        require: true,
    },
    valorTotal: {
        type: Number,
        require: true,
    },
    quantidadeDias: {
        type: Array,
        require: true,
    },

    formaPagamento: {
        type: String,
        require: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    carro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Carros",
        required: true,
    }
});

const Aluguel = mongoose.model("Aluguel", AluguelSchema)

export default Aluguel;