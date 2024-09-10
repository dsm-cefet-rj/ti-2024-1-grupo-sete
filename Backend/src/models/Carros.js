import mongoose from 'mongoose';

const CarrosSchema = new mongoose.Schema({
    modelo: {
        type: String,
        require: true,
    },
    ano: {
        type: String,
        require: true,
    },
    cidade: {
        type: String,
        require: true,
    },


    precoPorDia: {
        type: Number,
        require: true,
    },


    detalhes: {
        type: String,
        require: true,
    },
    fotoLink1: {
        type: String,
        require: true,
    },
    enderecoRetirada: {
        type: String,
        require: true,
    }, 

    diasAlugado: {
        type: Array,
    },


    dataCriado: {
        type: Date,
        default: Date.now(),
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});

const Carros = mongoose.model("Carros", CarrosSchema)

export default Carros;