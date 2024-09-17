const express = require('express');
const { createHistorico ,getHistorico, getHistoricoById, updateHistorico, deleteHistorico } = require('../controllers/historicoController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', createHistorico);

router.get('/', getHistorico);

router.get('/:id', getHistoricoById);

router.put('/:id', authMiddleware, updateHistorico);

router.delete('/:id', authMiddleware, deleteHistorico);

module.exports = router;
