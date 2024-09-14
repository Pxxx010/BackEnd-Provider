const express = require('express');
const {getTecnicos, getTecnicosById, updateTecnicos, deleteTecnicos} = require('../controllers/usersTecnicoController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getTecnicos);

router.get('/:id', getTecnicosById);

router.put('/:id', authMiddleware, updateTecnicos);

router.delete('/:id', authMiddleware, deleteTecnicos);

module.exports = router;