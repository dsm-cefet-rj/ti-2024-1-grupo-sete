import mongoose from 'mongoose';

const CarrosSchema = new mongoose.Schema({
    modelo: {
        type: String,
        require: true
    },
    ano: {
        type: String,
        require: true
    },
    cidade: {
        type: String,
        require: true
    },


    precoPorDia: {
        type: Int,
        require: true
    },


    detalhes: {
        type: String,
        require: true
    },
    fotoLink1: {
        type: String,
        require: true
    },
    // fotoLink2: {
    //     type: String,
    //     require: true
    // },


    diasAlugado: {
        type: Date,
        require: false
    },


    dataCriado: {
        type: Date,
        require: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Carros = mongoose.Model("Carros", CarrosSchema)

export default Carros;