import mongoose from 'mongoose';

//const Schema = mongoose.Schema;

const RegistroSchema = new mongoose.Schema({
  //nome: { type: String, required: true },
  //carro: { type: String, required: true },
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
    required: true
  },
  dataDoPagamento: {
    type: Date,
    default: Date.now(),
  },
  formaPagamento: {
    type: String,
    require: true,
  },

  //Cliente / comprador
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // carro: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Carros",
  //   required: true,
  // }
});

const Registro = mongoose.model("Registro", RegistroSchema)

export default Registro;
