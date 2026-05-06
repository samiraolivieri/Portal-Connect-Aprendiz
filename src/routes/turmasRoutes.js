const express = require('express');
const router = express.Router();
const turmasController = require('../controllers/turmasController');

router.get('/', turmasController.listarTurmas);
router.post('/', turmasController.criarTurma);
router.delete('/:id', turmasController.excluirTurma);
router.get('/:id/detalhes', turmasController.obterDetalhesTurma);
router.get('/dados/lancamento', turmasController.buscarDadosParaLancamento);
router.post('/notas', turmasController.lancarNota);
router.post('/frequencia', turmasController.lancarFrequencia);

module.exports = router;