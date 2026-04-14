const express = require('express');
const router = express.Router();
const boletimController = require('../controllers/boletimController');

// Rota: GET http://localhost:5000/api/boletins/aprendiz/1
router.get('/aprendiz/:aprendizId', boletimController.getBoletim);

module.exports = router;