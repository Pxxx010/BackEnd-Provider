const express = require('express');
const { createChamado ,getChamado, getChamadoById, updateChamado, deleteChamado } = require('../controllers/chamadosController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createChamado);

router.get('/', authMiddleware, getChamado);

router.get('/:id', authMiddleware, getChamadoById);

router.put('/:id', authMiddleware, updateChamado);

router.delete('/:id', authMiddleware, deleteChamado);

module.exports = router;
