const express = require('express');
const router = express.Router();
const desempenhoController = require('../controllers/desempenhoController');

// A rota completa será: http://localhost:5000/api/desempenho/geral
router.get('/geral', desempenhoController.listarDesempenhoAprendizes);
router.get('/:id', desempenhoController.obterDetalhesDesempenho);

 
// A rota completa será: http://localhost:5000/api/desempenho/geral

 
module.exports = router;