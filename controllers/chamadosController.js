const Chamado = require('../models/chamadoModel');

exports.createChamado = async (req, res) => {
  try {
    const chamado = new Chamado(req.body);
    await chamado.save();
    res.status(201).json(chamado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getChamado = async (req, res) => {
    try{
        const chamado = await Chamado.find();
        res.json(chamado);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

exports.getChamadoById = async (req, res) => {
    try {
      const chamado = await Chamado.findById(req.params.id);
      if (!chamado) {
        return res.status(404).json({ message: 'Chamado não encontrado.' });
      }
      res.json(chamado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

exports.updateChamado = async (req, res) => {
    try {
      const chamado = await Chamado.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!chamado) {
        return res.status(404).json({ message: 'Chamado não encontrado.' });
      }
      res.json(chamado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

exports.deleteChamado = async (req, res) => {
    try {
      await Chamado.findByIdAndDelete(req.params.id);
      res.json({ message: 'Chamado Deletado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };