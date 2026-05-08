const db = require('../config/db.js')
const express = require ('express');
const visitaController = require('../controllers/visitaController.js');

const router = express.Router();

router.post('/agendar', visitaController.agendarVisita);
router.get('/listar/:id', async (req, res) => {
    try {
        const {id} = req.params
        const sql = "SELECT * FROM visitas_tecnicas WHERE gestor_id = ? ORDER BY data_visita DESC";
        const [visitas] = await db.query(sql, [id])
        res.status(200).json(visitas)

        
    } catch (error) {
        console.error("Erro ao buscar as visitas", error)
        res.status(500).json({ error: "Erro ao buscar dados no banco" })
    }

})

// Rota para obter a média mensal da turma para o gráfico
router.get('/desempenho-turma', async (req, res) => {
    try {
        const sql = `
            SELECT 
                DATE_FORMAT(data_referencia, '%b') AS mes, 
                AVG(nota_tecnica) AS performance 
            FROM desempenho_aprendiz 
            GROUP BY data_referencia 
            ORDER BY data_referencia ASC
        `;
        const [rows] = await db.query(sql);
        
        // Formata os dados para garantir que a performance seja um número
        const dadosFormatados = rows.map(row => ({
            mes: row.mes,
            performance: parseFloat(row.performance).toFixed(1)
        }));

        res.status(200).json(dadosFormatados);
    } catch (error) {
        console.error("Erro ao buscar desempenho:", error);
        res.status(500).json({ error: "Erro ao carregar dados do banco" });
    }
});
router.put('/atualizar-status/:id', async (req, res) => {
    const { id } = req.params;
    const { novoStatus } = req.body; 

    try {
        const sql = `
            UPDATE visitas_tecnicas 
            SET status = ? 
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