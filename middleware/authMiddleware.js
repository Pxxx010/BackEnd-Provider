const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const User = require('../models/coordenadorModel');

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
    if (!req.user || (req.user.cargo != "Gerente" && req.user.cargo != "Adm")) {
      return res.status(401).json({ message: 'Usuário não autorizado, autorização negada' });
    }

    // Verifica se o method é DELETE
    if (req.method === 'DELETE') {
      // Capturando ID na URL
      const userIdToDelete = req.params.id;
      const userToDelete = await User.findById(userIdToDelete);

      if (!userToDelete) {
        return res.status(404).json({ message: 'Usuário a ser excluído não encontrado' });
      }

      if (userToDelete.cargo === "Gerente" && req.user.cargo === "Gerente") {
        return res.status(403).json({ message: 'Acesso Negado' });
      }

      if (userToDelete.cargo === "Adm" && req.user.cargo === "Adm") {
        return res.status(403).json({ message: 'Acesso Negado' });
      }
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'O token não é válido' });
  }
};
