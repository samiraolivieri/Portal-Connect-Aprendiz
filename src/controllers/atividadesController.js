const AtividadePendente = require('../models/atividadesPendente');

// Listar atividades de um aprendiz específico
exports.listarPorAprendiz = async (req, res) => {
    try {
        const { aprendiz_id } = req.params;
        const atividades = await AtividadePendente.findAll({
            where: { aprendiz_id: aprendiz_id },
            order: [['prazo', 'ASC']] // As que vencem logo aparecem primeiro
        });
        res.status(200).json(atividades);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar atividades." });
    }
};

// Marcar atividade como concluída
exports.concluirAtividade = async (req, res) => {
    try {
        const { id } = req.params;
        await AtividadePendente.update(
            { concluida: true },
            { where: { id: id } }
        );
        res.status(200).json({ mensagem: "Atividade atualizada com sucesso!" });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar atividade." });
    }
};