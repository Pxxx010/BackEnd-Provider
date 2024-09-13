const mongoose = require('mongoose');

const CategoriaChamadoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('CategoriaChamado', CategoriaChamadoSchema);
