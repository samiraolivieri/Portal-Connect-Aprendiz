const express = require("express");
const router = express.Router();
const controller = require("../controllers/pedagogoController");

router.get("/buscar/:nome", controller.buscarAprendiz);
router.get("/justificativas", controller.listarJustificativas);
router.put("/justificativas/:id", controller.atualizarJustificativa);
router.post("/comunicado", controller.criarComunicado);
router.get("/comunicados", controller.listarComunicados);
router.get("/estatisticas", controller.buscarEstatisticas);
router.get("/materiais", controller.listarMateriais);
router.post("/materiais", controller.criarMaterial);

module.exports = router;