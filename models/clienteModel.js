const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefone: { type: String, required: true },
  endereco: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Cliente', ClienteSchema);
