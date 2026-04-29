const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota: POST http://localhost:5000/api/auth/login
router.post('/login', authController.login);
// Abaixo da sua rota de login, adicione:
router.get('/aprendizes', authController.listarAprendizes);

module.exports = router;