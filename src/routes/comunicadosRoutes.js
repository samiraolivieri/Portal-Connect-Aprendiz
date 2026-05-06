const express = require('express');
const router = express.Router();
const db = require('../config/db')

const comunicadosController = require('../controllers/comunicadosController');

// Linha 6: Onde o erro estava! 
// Se o nome aqui for diferente do que está no controller, o sistema trava.
// No seu arquivo de rotas
router.get('/comunicados', async (req, res) => {
    try {
        const sql = "SELECT * FROM comunicados ORDER BY data_publicacao DESC";
        // IMPORTANTE: Use [linhas] com colchetes para pegar apenas os registros
        const [linhas] = await db.query(sql); 
        
        console.log("Registros encontrados:", linhas.length);
        res.status(200).json(linhas); // Envia o array puro para o frontend
    } catch (err) {
        console.error("Erro no Banco:", err);
        res.status(500).json({ error: "Erro interno" });
    }
});

// ROTA: Criar comunicado
router.post('/comunicados', async (req, res) => {
    try {
        // Recebendo os campos conforme sua tabela SQL
        const { autor_id, titulo, conteudo, prioridade, tipo_alvo, status, descricao } = req.body;
        
        // Query utilizando NOW() para a data_publicacao
        const sql = `INSERT INTO comunicados 
            (autor_id, titulo, conteudo, prioridade, tipo_alvo, status, descricao, data_publicacao) 
            VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`;

        const [result] = await db.query(sql, [
            autor_id, titulo, conteudo, prioridade, tipo_alvo, status, descricao
        ]);

        res.status(201).json({ 
            message: "Comunicado criado com sucesso!", 
            id: result.insertId 
        });
    } catch (err) {
        console.error("Erro ao inserir comunicado:", err);
    }
});

// ROTA: Editar comunicado
router.put('/comunicados/:id', async (req, res) => {
    try {
        const { titulo, conteudo, prioridade, tipo_alvo, status, descricao } = req.body;
        
        // Query de atualização com as colunas corretas
        const sql = `UPDATE comunicados SET 
            titulo=?, conteudo=?, prioridade=?, tipo_alvo=?, status=?, descricao=? 
            WHERE id=?`;

        await db.query(sql, [
            titulo, conteudo, prioridade, tipo_alvo, status, descricao, req.params.id
        ]);

        res.json({ message: "Comunicado atualizado com sucesso!" });
    } catch (err) {
        console.error("Erro ao atualizar comunicado:", err);
        res.status(500).send("Erro ao atualizar no banco.");
    }
});

// ROTA: Excluir comunicado
router.delete('/comunicados/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM comunicados WHERE id=?', [req.params.id]);
        res.json({ message: "Comunicado excluído com sucesso!" });
    } catch (err) {
        console.error("Erro ao excluir comunicado:", err);
        res.status(500).send("Erro ao excluir do banco.");
    }
});


module.exports = router;