const mongoose = require('mongoose');

const ChamadoSchema = new mongoose.Schema({
  cliente: { type: String, required: true },
  telefone: {type: Number},
  tecnicoId: { type: String},
  categoriaId: { type: String},
  descricao: { type: String, required: true },
  status: { type: String, enum: ["aberto", "em andamento", "concluído"], default: "aberto" }
}, { timestamps: true });

module.exports = mongoose.model('Chamado', ChamadoSchema);
