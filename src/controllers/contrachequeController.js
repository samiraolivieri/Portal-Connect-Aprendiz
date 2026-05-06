const ContrachequeModel = require('../models/contracheque');

const contrachequeController = {
    // Função para o POST /upload (Ajustada para Async/Await)
    upload: async (req, res) => {
        try {
            const { aprendiz_id, mes_referencia } = req.body;
            // Pega o caminho do arquivo e garante que as barras fiquem no padrão correto (/)
            const caminho_arquivo = req.file ? req.file.path.replace(/\\/g, '/') : null;

            if (!aprendiz_id || !mes_referencia || !caminho_arquivo) {
                return res.status(400).json({ error: 'Dados incompletos!' });
            }

            // Chamada ao model usando await
            const result = await ContrachequeModel.create({ 
                aprendiz_id, 
                mes_referencia, 
                caminho_arquivo 
            });

            res.status(201).json({ 
                message: 'Contracheque enviado com sucesso!', 
                id: result.insertId 
            });
        } catch (err) {
            console.error("Erro no upload:", err);
            res.status(500).json({ error: err.message });
        }
    },

    // Função para o GET /todos
    listarTodos: async (req, res) => {
        try {
            const results = await ContrachequeModel.getAll();
            res.json(results);
        } catch (err) {
            console.error("Erro ao listar todos:", err);
            res.status(500).json({ error: err.message });
        }
    },

    // Função para o GET /meus/:id
    listarPorAprendiz: async (req, res) => {
        try {
            const { id } = req.params;
            const results = await ContrachequeModel.getByAprendiz(id);
            res.json(results);
        } catch (err) {
            console.error("Erro ao listar por aprendiz:", err);
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = contrachequeController;