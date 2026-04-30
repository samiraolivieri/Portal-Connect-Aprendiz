const express = require('express');
const router = express.Router();
const desempenhoController = require('../controllers/desempenhoController');

// A rota completa será: http://localhost:5000/api/desempenho/geral
router.get('/geral', desempenhoController.listarDesempenhoAprendizes);
router.get('/:id', desempenhoController.obterDetalhesDesempenho);

<<<<<<< HEAD
=======
 
// A rota completa será: http://localhost:5000/api/desempenho/geral

 
>>>>>>> c90802b0c50a7593d0dcd78d0ae58926808e0681
module.exports = router;