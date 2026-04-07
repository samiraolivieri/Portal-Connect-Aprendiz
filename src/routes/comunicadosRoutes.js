const express = require('express');
const router = express.Router();
const controller = require('../controllers/comunicadosController');

// Rota para a tela principal do aprendiz
router.get('/comunicados/aprendiz', controller.listarParaAprendiz);

module.exports = router;