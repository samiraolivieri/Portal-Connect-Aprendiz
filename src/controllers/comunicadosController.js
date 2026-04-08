const Comunicado = require('../models/comunicado');
const Usuario = require('../models/usuario');

exports.listarParaAprendiz = async (req, res) => {
    try {
        // Buscamos comunicados que sejam para 'aprendiz' ou para 'todos'
        const avisos = await Comunicado.findAll({
            where: {
                tipo_alvo: ['aprendiz', 'todos', 'geral'] // Ajuste conforme os tipos que vcs criarem
            },
            include: [{
                model: Usuario,
                as: 'autor',
                attributes: ['nome'] // Para aparecer: "Postado por: Sérgio Carvalho"
            }],
            order: [['data_publicacao', 'DESC']] // Mais recentes primeiro
        });

        res.status(200).json(avisos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao carregar comunicados." });
    }
};