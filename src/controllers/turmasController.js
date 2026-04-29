const Turma = require('../models/turma');
const db = require('../config/db');

exports.listarTurmas = async (req, res) => {
    try {
        const results = await Turma.findAll();
        res.json(results);
    } catch (err) {
        console.error("Erro no listarTurmas:", err);
        res.status(500).json({ error: "Erro ao buscar turmas" });
    }
};

exports.criarTurma = async (req, res) => {
    try {
        const result = await Turma.create(req.body);
        res.status(201).json({ message: "Turma criada com sucesso!", id: result.insertId });
    } catch (err) {
        console.error("Erro no criarTurma:", err);
        res.status(500).json({ error: "Erro ao criar turma" });
    }
};

exports.excluirTurma = async (req, res) => {
    try {
        await Turma.delete(req.params.id);
        res.json({ message: "Turma excluída com sucesso!" });
    } catch (err) {
        console.error("Erro no excluirTurma:", err);
        res.status(500).json({ error: "Erro ao excluir turma" });
    }
};
// No turmasController.js
exports.obterDetalhesTurma = async (req, res) => {
    try {
        const turmaId = req.params.id;

        // 1. Buscar os dados da própria turma
        const [turmaResult] = await db.query('SELECT * FROM turmas WHERE id = ?', [turmaId]);
        
        // 2. Buscar os alunos (aprendizes) daquela turma
        // Note: usei a tabela 'usuarios' e filtrei por nivel 'aprendiz'
        const [alunos] = await db.query(
            'SELECT id, nome, email FROM usuarios WHERE turma_id = ? AND nivel = "aprendiz"', 
            [turmaId]
        );

        if (turmaResult.length === 0) {
            return res.status(404).json({ error: "Turma não encontrada" });
        }

        // Retorna a turma e a lista de alunos juntos
        res.json({
            ...turmaResult[0],
            alunos: alunos
        });
    } catch (err) {
        console.error("Erro detalhado no servidor:", err); // Isso vai aparecer no seu VS Code
        res.status(500).json({ error: "Erro ao buscar detalhes da turma" });
    }
};

// --- No turmasController.js ---

// Buscar apenas alunos e UCs para popular os SELECTS
exports.buscarDadosParaLancamento = async (req, res) => {
    try {
        const [alunos] = await db.query('SELECT id, nome FROM usuarios WHERE nivel = "aprendiz"');
        const [ucs] = await db.query('SELECT id, nome_uc FROM unidades_curriculares');
        res.json({ alunos, ucs });
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar dados para lançamento" });
    }
};

// Salvar a nota
exports.lancarNota = async (req, res) => {
    try {
        const { aluno_id, uc_id, valor_nota } = req.body;
        await db.query('INSERT INTO notas (aluno_id, uc_id, valor_nota) VALUES (?, ?, ?)', 
                       [aluno_id, uc_id, valor_nota]);
        res.status(201).json({ message: "Nota lançada com sucesso!" });
    } catch (err) {
        res.status(500).json({ error: "Erro ao salvar nota" });
    }
};
exports.lancarFrequencia = async (req, res) => {
    try {
        // Agora o controller espera 'data_aula'
        const { aluno_id, uc_id, data_aula, valor_frequencia } = req.body;
        
        await db.query(
            'INSERT INTO frequencia (aluno_id, uc_id, data_aula, valor_frequencia) VALUES (?, ?, ?, ?)', 
            [aluno_id, uc_id, data_aula, valor_frequencia]
        );
        res.status(201).json({ message: "Frequência lançada com sucesso!" });
    } catch (err) {
        console.error("Erro ao salvar frequência:", err);
        res.status(500).json({ error: "Erro ao salvar frequência" });
    }
};