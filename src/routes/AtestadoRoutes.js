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

const upload = multer({ storage })

router.post('/enviar', upload.single('atestado'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).send("Arquivo não enviado");

        const { aprendiz_id, data_emissao, titulo, descricao, motivo } = req.body;
        const url_arquivo = req.file.path;
        const status = 'Pendente';
        const status_empresa = 'Pendente';
        const status_instituicao = 'Pendente';

        const sql = "INSERT INTO atestados_justificativas (aprendiz_id, status_empresa, status_instituicao, url_arquivo, data_emissao, titulo, descricao, motivo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        const [result] = await db.query(sql, [aprendiz_id, status_empresa, status_instituicao, url_arquivo, data_emissao, titulo, descricao, motivo]);

        res.status(201).send({ message: "Atestado enviado com sucesso!", id: result.insertId });

    } catch (err) {
        console.log("--- DETALHES DO ERRO ---");
        console.error(err); // Isso vai imprimir o objeto de erro inteiro no terminal
        res.status(500).send("Erro de conexão com o banco.");
    }
});
router.get('/listar/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const sql = "SELECT * FROM atestados_justificativas WHERE aprendiz_id = ? ORDER BY data_emissao DESC"
        const [atestados] = await db.query(sql, [id])

        res.status(200).json(atestados)
    } catch (error) {
        console.error("Erro ao buscar o atestado", error)
        res.status(500).json({ error: "Erro ao buscar dados no banco" })

    }
})

router.get('/gestor/pendentes-geral', async (req, res) => {
    try {
        const sql = `
            SELECT aj.*, u.nome as aprendiz_nome 
            FROM atestados_justificativas aj
            JOIN usuarios u ON aj.aprendiz_id = u.id
            WHERE aj.status_empresa = 'Pendente'
            ORDER BY aj.data_emissao DESC
        `;
        const [atestados] = await db.query(sql);
        res.status(200).json(atestados);
    } catch (error) {
        console.error("Erro ao buscar pendências:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
});

router.get('/pedagogo/pendentes-geral', async (req, res) => {
    try {
        const sql = `
            SELECT aj.*, u.nome as aprendiz_nome 
            FROM atestados_justificativas aj
            JOIN usuarios u ON aj.aprendiz_id = u.id
            WHERE aj.status_instituicao = 'Pendente'
            ORDER BY aj.data_emissao DESC
        `;
        const [atestados] = await db.query(sql);
        res.status(200).json(atestados);
    } catch (error) {
        console.error("Erro ao buscar pendências:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
});
router.put('/atualizar-status/empresa/:id', async (req, res) => {
    const { id } = req.params;
    const { novoStatus } = req.body; 

    try {
        const sql = `
            UPDATE atestados_justificativas 
            SET status_empresa = ? 
            WHERE id = ?
        `;
        
        await db.query(sql, [novoStatus, id]);
        
        res.status(200).json({ message: `Status atualizado para ${novoStatus}` });
    } catch (error) {
        console.error("Erro ao atualizar status:", error);
        res.status(500).json({ error: "Erro ao atualizar dados no banco" });
    }
});

router.put('/atualizar-status/pedagogo/:id', async (req, res) => {
    const { id } = req.params;
    const { novoStatus } = req.body; 

    try {
        const sql = `
            UPDATE atestados_justificativas 
            SET status_instituicao = ? 
            WHERE id = ?
        `;
        
        await db.query(sql, [novoStatus, id]);
        
        res.status(200).json({ message: `Status atualizado para ${novoStatus}` });
    } catch (error) {
        console.error("Erro ao atualizar status:", error);
        res.status(500).json({ error: "Erro ao atualizar dados no banco" });
    }
});
module.exports = router;
