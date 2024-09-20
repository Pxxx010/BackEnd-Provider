const mongoose = require('mongoose');

const ChamadoSchema = new mongoose.Schema({
  cliente: { type: String, required: true },
  telefone: {type: Number},
  responsavelId: { type: String},
  categoria: { type: String},
  descricao: { type: String, required: true },
  localizacao: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  status: { type: String, enum: ["aberto", "em andamento", "concluído"], default: "aberto" }
}, { timestamps: true });

module.exports = mongoose.model('Chamado', ChamadoSchema);
