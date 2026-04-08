const express = require('express');
const router = express.Router();
const contatosController = require('../controllers/contatosController');

// Rota que o Front-end (React/Mobile) vai chamar
// O ":unidade_id" permite que o front passe 1 para Maracanã, 3 para Cenpes, etc.
router.get('/contatos/:unidade_id', contatosController.listarPorUnidade);

module.exports = router;