const db = require('../config/db');

const Contracheque = {
    create: async (data) => {
        const query = 'INSERT INTO contracheques (aprendiz_id, mes_referencia, caminho_arquivo, status) VALUES (?, ?, ?, ?)';
        const [result] = await db.query(query, [
            data.aprendiz_id, 
            data.mes_referencia, 
            data.caminho_arquivo,
            'Liberado'
        ]);
        return result;
    },

    getAll: async () => {
        const query = `
            SELECT c.*, u.nome as aprendiz_nome 
            FROM contracheques c 
            JOIN usuarios u ON c.aprendiz_id = u.id 
            ORDER BY c.data_upload DESC`;
        const [rows] = await db.query(query);
        return rows;
    },

    // A função que estava faltando:
    getByAprendiz: async (aprendiz_id) => {
        const query = 'SELECT * FROM contracheques WHERE aprendiz_id = ? ORDER BY mes_referencia DESC';
        const [rows] = await db.query(query, [aprendiz_id]);
        return rows;
    }
};

module.exports = Contracheque;