const express = require('express');
const router = express.Router();
const controller = require('../controllers/oportunidadesController');

// Rota para o mural de vagas do portal
router.get('/oportunidades', controller.listarVagasAtivas);

module.exports = router;