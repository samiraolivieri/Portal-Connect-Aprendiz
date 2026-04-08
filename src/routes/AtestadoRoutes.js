const express = require('express')
const router = express.Router()
const db = require('../config/db')
const multer = require('multer')
const path = require('path')

//Config onde o arquivo será salvo
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/') //Pasta onde serão guardados
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }

})

const upload = multer({storage})

router.post('/enviar-atestado', upload.single('atestado'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).send("Arquivo não enviado");

        const { aprendiz_id, data_emissao } = req.body;
        const url_arquivo = req.file.path;
        const status = 'Pendente';

        const sql = "INSERT INTO atestados_justificativas (aprendiz_id, status, url_arquivo, data_emissao) VALUES (?, ?, ?, ?)";
        
        const [result] = await db.query(sql, [aprendiz_id, status, url_arquivo, data_emissao]);

        res.status(201).send({ message: "Atestado enviado com sucesso!", id: result.insertId });

    } catch (err) {
        console.log("--- DETALHES DO ERRO ---");
        console.error(err); // Isso vai imprimir o objeto de erro inteiro no terminal
        res.status(500).send("Erro de conexão com o banco.");
    }
});

module.exports = router;
