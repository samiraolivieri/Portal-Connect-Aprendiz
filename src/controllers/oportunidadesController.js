const OportunidadeCarreira = require('../models/oportunidadeCarreira');
const { Op } = require('sequelize'); // Importar operadores do Sequelize

exports.listarVagasAtivas = async (req, res) => {
    try {
        const hoje = new Date().toISOString().split('T')[0]; // Pega a data de hoje no formato YYYY-MM-DD

        const vagas = await OportunidadeCarreira.findAll({
            where: {
                data_expiracao: {
                    [Op.gte]: hoje // Vencimento maior ou igual a hoje
                }
            },
            order: [['data_expiracao', 'ASC']] // Vagas que vencem logo aparecem primeiro
        });

        res.status(200).json(vagas);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar oportunidades de carreira." });
    }
};