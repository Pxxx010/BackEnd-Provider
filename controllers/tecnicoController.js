const jwt = require('jsonwebtoken');
const User = require('../models/tecnicoModel');
const config = require('../config/jwt');

exports.register = async (req, res) => {
  try {
    const { nome, email, senha, telefone, coordenadorId } = req.body;
    const user = new User({ nome, email, senha, telefone, coordenadorId });
    await user.save();
    res.status(201).json({ message: 'Técnico registrado com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparesenha(senha))) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
    const token = jwt.sign({ id: user._id, position: user.position }, config.secret);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
