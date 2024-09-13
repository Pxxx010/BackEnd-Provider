const mongoose = require('mongoose');

const ChamadoSchema = new mongoose.Schema({
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  tecnicoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tecnico', required: true },
  coordenadorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Coordenador', required: true },
  categoriaId: { type: mongoose.Schema.Types.ObjectId, ref: 'CategoriaChamado', required: true },
  descricao: { type: String, required: true },
  status: { type: String, enum: ["aberto", "em andamento", "concluído"], default: "aberto" },
  dataAbertura: { type: Date, default: Date.now },
  dataConclusao: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Chamado', ChamadoSchema);
