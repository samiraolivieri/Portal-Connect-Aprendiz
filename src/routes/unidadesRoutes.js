const express = require('express');
const router = express.Router();
const unidadesController = require('../controllers/unidadesController');

// Rota para listar todas as unidades
router.get('/', unidadesController.getUnidades);

module.exports = router;