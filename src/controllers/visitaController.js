// src/controllers/visitaController.js
const Visita = require('../models/visitaModel.js');

const agendarVisita = async (req, res) => {
    try {
        const { gestor_id, data_visita } = req.body;

        // Validação básica
        if (!gestor_id || !data_visita) {
            return res.status(400).json({ error: "Campos obrigatórios ausentes." });
        }

        const result = await Visita.criar(gestor_id, data_visita);

        res.status(201).json({ 
            message: "Visita agendada com sucesso!",
            id: result.insertId 
        });
    } catch (error) {
        console.error("Erro no Controller:", error.message);
        res.status(500).json({ 
            error: "Erro interno ao salvar agendamento.",
            details: error.message 
        });
    }
};

const listarVisitaGestor = async (req, res) => {
    try {
        const {gestor_id} = req.params
        if (!gestor_id) {
            return res.status(400).json({ error: "Campos obrigatórios ausentes." });
        }
        const result = await Visita.listarPorGestor(gestor_id);

        console.log("Lista funcionando")


    } catch (error) {
        console.error("Erro no Controller:", error.message);
        res.status(500).json({ 
            error: "Erro interno ao listar visitas.",
            details: error.message 
        });
    }
}
module.exports = {
    agendarVisita,
    listarVisitaGestor
};