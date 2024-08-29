const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegistroSchema = new Schema({
  nome: { type: String, required: true },
  carro: { type: String, required: true },
  quantDias: { type: Number, required: true },
  valorDiario: { type: Number, required: true },
  formPagamento: { type: String, required: true },
  status: { type: String, default: 'Alugado' },
  dataLocacao: { type: String, required: true },
  horaLocacao: { type: String, required: true },
});

const Registro = mongoose.model('Registro', RegistroSchema);

module.exports = Registro;
