const DesempenhoModel = require('../models/Desempenho');
 
exports.listarDesempenhoAprendizes = async (req, res) => {
    try {
        // Esperamos o Model buscar os dados
        const results = await DesempenhoModel.getRelatorioGeral();
       
        // Enviamos a resposta em JSON
        res.json(results);
    } catch (err) {
        console.error("Erro ao buscar desempenho:", err);
        res.status(500).json({
            error: "Erro ao carregar dados de desempenho",
            details: err.message
        });
    }
};