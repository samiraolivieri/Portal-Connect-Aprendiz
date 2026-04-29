const express = require('express');
const router = express.Router();
const desempenhoController = require('../controllers/desempenhoController');
<<<<<<< HEAD

// A rota completa será: http://localhost:5000/api/desempenho/geral
router.get('/geral', desempenhoController.listarDesempenhoAprendizes);
router.get('/:id', desempenhoController.obterDetalhesDesempenho);

=======
 
// A rota completa será: http://localhost:5000/api/desempenho/geral
router.get('/geral', desempenhoController.listarDesempenhoAprendizes);
 
>>>>>>> 1ec811925b393ba59c73fdf07fd66ab5c9191251
module.exports = router;