const Tecnico = require('../models/tecnicoModel');

exports.getTecnicos = async (req, res) => {
    try{
        const tecnicos = await Tecnico.find();
        res.json(tecnicos);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

exports.getTecnicosById = async (req, res) => {
    try {
      const tecnicos = await Tecnico.findById(req.params.id);
      if (!tecnicos) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(tecnicos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

exports.updateTecnicos = async (req, res) => {
    try {
      const tecnicos = await Tecnico.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!tecnicos) {
        return res.status(404).json({ message: 'Tecnico não encontrado.' });
      }
      res.json(tecnicos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

exports.deleteTecnicos = async (req, res) => {
    try {
      await Tecnico.findByIdAndDelete(req.params.id);
      res.json({ message: 'Tecnico Deletado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };