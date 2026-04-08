const express = require('express');
const router = express.Router();
const oportunidadesController = require('../controllers/oportunidadesController');

// Rota para listar as vagas
router.get('/', oportunidadesController.getOportunidades);

module.exports = router;