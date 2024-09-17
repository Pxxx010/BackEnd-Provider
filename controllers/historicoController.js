const Historico = require('../models/historicoModel');

exports.createHistorico = async (req, res) => {
  try {
    const chamado = new Historico(req.body);
    await chamado.save();
    res.status(201).json(chamado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getHistorico = async (req, res) => {
    try{
        const chamado = await Historico.find();
        res.json(chamado);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

exports.getHistoricoById = async (req, res) => {
    try {
      const chamado = await Historico.findById(req.params.id);
      if (!chamado) {
        return res.status(404).json({ message: 'Historico não encontrado.' });
      }
      res.json(chamado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

exports.updateHistorico = async (req, res) => {
    try {
      const chamado = await Historico.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!chamado) {
        return res.status(404).json({ message: 'Historico não encontrado.' });
      }
      res.json(chamado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

exports.deleteHistorico = async (req, res) => {
    try {
      await Historico.findByIdAndDelete(req.params.id);
      res.json({ message: 'Historico Deletado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };