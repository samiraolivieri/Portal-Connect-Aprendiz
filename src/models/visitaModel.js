// src/models/visitaModel.js

const db = require('../config/db.js');

const Visita = {
    // Método para criar um novo agendamento
    criar: async (gestor_id, data_visita) => {
        status_visita = "Pendente"
        const sql = "INSERT INTO visitas_tecnicas (gestor_id, data_visita, status) VALUES (?, ?, ?)";
        const [result] = await db.execute(sql, [gestor_id, data_visita, status_visita]);
        return result;
    },

    // Método opcional para listar visitas (útil para o Dashboard)
    listarPorGestor: async (gestor_id) => {
        const sql = "SELECT * FROM visitas_tecnicas WHERE gestor_id = ? ORDER BY data_visita DESC";
        const [rows] = await db.execute(sql, [gestor_id]);
        return rows;
    }

};

module.exports = Visita;