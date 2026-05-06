const express = require('express');
const router = express.Router();
const ucController = require('../controllers/ucController');

// Rota: GET /api/uc
router.get('/', ucController.getUCs);

module.exports = router;