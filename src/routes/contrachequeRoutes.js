const express = require('express');
const router = express.Router();
const contrachequeController = require('../controllers/contrachequeController');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Importamos o File System

// 1. Criamos o caminho absoluto de forma ultra segura
const uploadPath = path.resolve(__dirname, '..', '..', 'uploads', 'contracheques');

// 2. Função de emergência: Se a pasta não existir por erro de sincronia, o Node cria ela na marra
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Usamos o caminho absoluto que criamos acima
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `contracheque-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

// --- Rotas ---
router.post('/upload', upload.single('arquivo'), contrachequeController.upload);
router.get('/todos', contrachequeController.listarTodos);
router.get('/meus/:id', contrachequeController.listarPorAprendiz);

module.exports = router;