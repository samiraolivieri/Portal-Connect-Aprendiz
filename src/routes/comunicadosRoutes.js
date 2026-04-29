const express = require('express');
const router = express.Router();
const comunicadosController = require('../controllers/comunicadosController');

// Linha 6: Onde o erro estava! 
// Se o nome aqui for diferente do que está no controller, o sistema trava.
router.get('/', comunicadosController.getComunicados);

module.exports = router;