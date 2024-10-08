const mongoose = require('mongoose');

const HistoricoChamadoSchema = new mongoose.Schema({
  chamadoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chamado', required: true },
  statusAnterior: { type: String, required: true },
  statusAtual: { type: String, required: true },
  dataModificacao: { type: Date, default: Date.now },  
  localizacao: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  responsavelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tecnico' } // ou Coordenador
}, { timestamps: true });

module.exports = mongoose.model('HistoricoChamado', HistoricoChamadoSchema);
