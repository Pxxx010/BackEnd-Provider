const express = require('express');
const { createChamado ,getChamado, getChamadoById, updateChamado, deleteChamado } = require('../controllers/chamadosController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', createChamado);

router.get('/', getChamado);

router.get('/:id', getChamadoById);

router.put('/:id', authMiddleware, updateChamado);

router.delete('/:id', authMiddleware, deleteChamado);

module.exports = router;
