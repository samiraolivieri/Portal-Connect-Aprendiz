const express = require('express');
const router = express.Router();
const multer = require('multer'); // Importa o multer
const materialController = require('../controllers/materialController');

// 1. Configuração do Multer (Onde e como salvar o PDF)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Garanta que a pasta 'uploads' exista na raiz do seu backend
    },
    filename: (req, file, cb) => {
        // Renomeia o arquivo para evitar que nomes iguais se sobrescrevam
        cb(null, Date.now() + '-' + file.originalname);
    }
});


const upload = multer({ storage: storage });

// 2. Rota de Publicação
// O 'upload.single('arquivo')' precisa ter o mesmo nome que você usou no formData.append('arquivo', ...) lá no seu React
router.post('/publicar', upload.single('arquivo'), materialController.publicarMaterial);
router.get('/', materialController.listarMateriais);

module.exports = router;