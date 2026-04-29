const express = require('express');
const router = express.Router();
const atividadesController = require('../controllers/atividadesController');

// O erro acontece aqui se "getAtividades" estiver escrito errado ou não existir no controller
router.get('/:userId', atividadesController.getAtividades); 

module.exports = router;