const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const User = require('../models/coordenadorModel');
const Tecnico = require('../models/tecnicoModel');

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

    if (req.method === 'DELETE') {
      const userIdToDelete = req.params.id;

      // Verifica primeiro na coleção User
      let userToDelete = await User.findById(userIdToDelete);
      
      if (userToDelete) {
        await User.findByIdAndDelete(userIdToDelete);
        return res.status(200).json({ message: 'Usuário deletado com sucesso' });
      } 
      
      // Se não encontrou, verifica na coleção Tecnico
      userToDelete = await Tecnico.findById(userIdToDelete);
      
      if (userToDelete) {
        await Tecnico.findByIdAndDelete(userIdToDelete);
        return res.status(200).json({ message: 'Usuário deletado com sucesso' });
      }
      
      // Se não encontrou em nenhuma das coleções
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    if (req.method === 'PUT') {
      const userIdToUpdate = req.params.id;
      const updateData = req.body; // Dados de atualização
  
      // Verifica primeiro na coleção User
      let userToUpdate = await User.findById(userIdToUpdate);
      
      if (userToUpdate) {
          // Atualiza o documento na coleção User
          userToUpdate = await User.findByIdAndUpdate(userIdToUpdate, updateData, { new: true });
          return res.status(200).json({ message: 'Usuário atualizado com sucesso', user: userToUpdate });
      }
      
      // Se não encontrou, verifica na coleção Tecnico
      userToUpdate = await Tecnico.findById(userIdToUpdate);
      
      if (userToUpdate) {
          // Atualiza o documento na coleção Tecnico
          userToUpdate = await Tecnico.findByIdAndUpdate(userIdToUpdate, updateData, { new: true });
          return res.status(200).json({ message: 'Usuário atualizado com sucesso', user: userToUpdate });
      }
      
      // Se não encontrou em nenhuma das coleções
      return res.status(404).json({ message: 'Usuário não encontrado' });
  }
  


    next();
  } catch (error) {
    res.status(401).json({ message: 'O token não é válido' });
  }
};