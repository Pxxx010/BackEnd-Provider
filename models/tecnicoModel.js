const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const TecnicoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  cargo: {type: String, default: "Tecnico"},
  senha: { type: String, required: true },
  telefone: { type: String, required: true },
  status: { type: String, enum: ["ativo", "inativo"], default: "ativo" },
  coordenadorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Coordenador' }
}, { timestamps: true });

TecnicoSchema.pre('save', async function(next) {
  if (this.isModified('senha')) {
    this.senha = await bcrypt.hash(this.senha, 10);
  }
  next();
});

TecnicoSchema.methods.comparesenha = function(senha) {
  return bcrypt.compare(senha, this.senha);
};

module.exports = mongoose.model('Tecnico', TecnicoSchema);
