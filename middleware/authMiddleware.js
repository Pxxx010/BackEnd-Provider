const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const User = require('../models/userModel');

module.exports = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Token inválido, autorização negada' });
  }

  // Extrair o token do cabeçalho
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token inválido, autorização negada' });
  }

  try {
    const decoded = jwt.verify(token, config.secret);
    req.user = await User.findById(decoded.id);  
    
    if (req.method === 'POST' || req.method === 'GET') {

      if (req.user.cargo === "Gerente" || req.user.cargo === "Adm") {
        return res.status(401).json({ message: 'Usuário não autorizado, autorização negada' });
      }

      next();
    }


    if (req.method === 'DELETE' || req.method === 'PUT') {

      if (req.user.cargo === "Gerente" || req.user.cargo === "Adm") {
        return res.status(401).json({ message: 'Usuário não autorizado, autorização negada' });
      }

      next();
    }

  } catch (error) {
    res.status(401).json({ message: 'O token não é válido' });
  }
};