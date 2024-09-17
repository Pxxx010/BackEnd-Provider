const jwt = require('jsonwebtoken');
const User = require('../models/coordenadorModel');
const config = require('../config/jwt');

exports.register = async (req, res) => {
  try {
    const { nome, email, senha, telefone, cargo } = req.body;
    const user = new User({ nome, email, senha, telefone, cargo });
    await user.save();
    res.status(201).json({ message: 'Coordenador registrado com sucesso!'});
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
    const token = jwt.sign({ id: user._id, cargo: user.cargo }, config.secret, {expiresIn: '5m'});
    res.json({ token, id: user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
