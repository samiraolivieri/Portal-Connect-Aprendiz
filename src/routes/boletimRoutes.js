const express = require('express');
const router = express.Router();
const boletinController = require('../controllers/boletimController');

// Rota: GET http://localhost:5000/api/boletins/aprendiz/1
router.get('/aprendiz/:aprendizId', boletinController.getBoletim);

module.exports = router;