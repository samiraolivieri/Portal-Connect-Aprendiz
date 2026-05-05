
const DesempenhoModel = require('../models/desempenho');
const db = require('../config/db');

exports.listarDesempenhoAprendizes = async (req, res) => {
    try {
        const results = await DesempenhoModel.getRelatorioGeral();
        res.json(results);
    } catch (err) {
        console.error("Erro ao buscar desempenho:", err);
        res.status(500).json({ 
            error: "Erro ao carregar dados de desempenho",
            details: err.message 
        });
    }
};

exports.obterDetalhesDesempenho = async (req, res) => {
    try {
        const { id } = req.params; // ID do aluno
        
        // 1. Buscamos o nome do aluno
        const [alunoRows] = await db.query('SELECT nome FROM usuarios WHERE id = ?', [id]);
        
        if (alunoRows.length === 0) {
            return res.status(404).json({ error: "Aluno não encontrado" });
        }

        // 2. Buscamos as notas
        const [notasRows] = await db.query(`
            SELECT n.valor_nota, uc.nome_uc 
            FROM notas n
            JOIN unidades_curriculares uc ON n.uc_id = uc.id
            WHERE n.aluno_id = ?`, 
            [id]
        );

        // 3. Buscamos a Frequência (NOVO!)
        // Fazemos o JOIN com a tabela unidades_curriculares para pegar o nome da UC
        const [freqRows] = await db.query(`
            SELECT f.valor_frequencia, f.data_aula, uc.nome_uc 
            FROM frequencia f
            JOIN unidades_curriculares uc ON f.uc_id = uc.id
            WHERE f.aluno_id = ?`, 
            [id]
        );

        // Retornamos tudo em um único objeto para o Front-end
        res.json({
            nome: alunoRows[0].nome,
            notas: notasRows,
            frequencias: freqRows // Agora o front-end recebe esse array
        });
    } catch (err) {
        console.error("Erro ao buscar relatório:", err);
        res.status(500).json({ error: "Erro ao buscar relatório" });
    }

}