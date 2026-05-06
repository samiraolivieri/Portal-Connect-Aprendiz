const express = require('express');
const router = express.Router();
const contrachequeController = require('../controllers/contrachequeController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 1. Definição do caminho absoluto para a pasta de contracheques
const uploadPath = path.resolve(__dirname, '..', '..', 'uploads', 'contracheques');

// 2. Garantia de que a estrutura de pastas existe fisicamente no servidor
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Log para te ajudar na depuração durante a apresentação
console.log("📂 Servidor configurado para salvar contracheques em:", uploadPath);

// 3. Configuração do armazenamento do Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Gera um nome único evitando substituição de arquivos
        cb(null, `contracheque-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

// --- Rotas da API (Apenas lógica de Backend) ---

// Rota para upload: o campo no FormData do React deve se chamar 'arquivo'
router.post('/upload', upload.single('arquivo'), contrachequeController.upload);

router.get('/todos', contrachequeController.listarTodos);

router.get('/meus/:id', contrachequeController.listarPorAprendiz);

module.exports = router;