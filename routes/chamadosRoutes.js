const express = require('express');
const { createChamado ,getChamado, getChamadoById, updateChamado, deleteChamado } = require('../controllers/chamadosController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createChamado);

router.get('/', getChamado);

router.get('/:id', getChamadoById);

router.put('/:id', updateChamado);

router.delete('/:id', authMiddleware, deleteChamado);

module.exports = router;
