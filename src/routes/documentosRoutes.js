const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const documentosController = require('../controllers/documentosController');

// Configuração do multer — salva na pasta uploads/ com nome único
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// Filtro: só aceita PDF e imagens
const fileFilter = (req, file, cb) => {
  const tiposAceitos = /pdf|jpeg|jpg|png/;
  const extValida = tiposAceitos.test(path.extname(file.originalname).toLowerCase());
  const mimeValido = tiposAceitos.test(file.mimetype);

  if (extValida && mimeValido) {
    cb(null, true);
  } else {
    cb(new Error("Formato inválido. Envie apenas PDF, JPG ou PNG."));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // limite de 5MB
});

// POST   /documentos/:aprendizId        → faz upload de um documento
// GET    /documentos/:aprendizId        → lista documentos (query ?tipo=contracheque)
// DELETE /documentos/:id                → deleta um documento

router.post('/:aprendizId', upload.single('arquivo'), documentosController.uploadDocumento);
router.get('/:aprendizId', documentosController.getDocumentos);
router.delete('/:id', documentosController.deleteDocumento);

module.exports = router;