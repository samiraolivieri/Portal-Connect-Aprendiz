const Contato = require('../models/contato');
const Unidade = require('../models/unidade');

// 1. Mantém a listagem geral (opcional)
exports.listarContatos = async (req, res) => {
    try {
        const lista = await Contato.findAll({
            include: [{
                model: Unidade,
                attributes: ['unidade'] 
            }]
        });
        res.status(200).json(lista);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao carregar a lista geral de contatos." });
    }
};

// 2. NOVA FUNÇÃO: Listar apenas os contatos da unidade do Aprendiz
exports.listarPorUnidade = async (req, res) => {
    try {
        const { unidade_id } = req.params; // Captura o ID que vem na URL (ex: /contatos/1)

        const lista = await Contato.findAll({
            where: { unidade_id: unidade_id }, // Filtra no banco pelo ID da unidade
            include: [{
                model: Unidade,
                attributes: ['unidade']
            }]
        });

        if (lista.length === 0) {
            return res.status(404).json({ mensagem: "Nenhum contato encontrado para esta unidade." });
        }

        res.status(200).json(lista);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao filtrar contatos por unidade." });
    }
};