const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const CoordenadorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  cargo: {type: String, enum: ["Gerente", "Adm"] },
  senha: { type: String, required: true },
  telefone: { type: String, required: true },
  status: { type: String, enum: ["ativo", "inativo"], default: "ativo" }
}, { timestamps: true });

CoordenadorSchema.pre('save', async function(next) {
  if (this.isModified('senha')) {
    this.senha = await bcrypt.hash(this.senha, 10);
  }
  next();
});

CoordenadorSchema.methods.comparesenha = function(senha) {
  return bcrypt.compare(senha, this.senha);
};


module.exports = mongoose.model('Coordenador', CoordenadorSchema);
