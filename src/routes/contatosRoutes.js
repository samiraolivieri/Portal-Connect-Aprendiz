const express = require('express');
const router = express.Router();
const contatosController = require('../controllers/contatosController');

// Linha 7: Aqui é onde o Node estava travando
// O nome depois do ponto deve ser getContatos
router.get('/', contatosController.getContatos);

module.exports = router;