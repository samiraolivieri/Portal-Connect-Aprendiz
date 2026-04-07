const express = require('express');
const router = express.Router();
const controller = require('../controllers/atividadesController');

// Rota para buscar as tarefas do aprendiz logado
router.get('/atividades/:aprendiz_id', controller.listarPorAprendiz);

// Rota para marcar como concluída (usamos PATCH porque é uma alteração parcial)
router.patch('/atividades/concluir/:id', controller.concluirAtividade);

module.exports = router;