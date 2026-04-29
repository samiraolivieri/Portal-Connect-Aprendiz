const db = require('../config/db'); 

const Turma = {
    findAll: async () => {
        const [rows] = await db.query('SELECT * FROM turmas');
        return rows;
    },
    create: async (data) => {
        const sql = 'INSERT INTO turmas (nome, curso, periodo) VALUES (?, ?, ?)';
        const [result] = await db.query(sql, [data.nome, data.curso, data.periodo]);
        return result;
    },
    delete: async (id) => {
        const [result] = await db.query('DELETE FROM turmas WHERE id = ?', [id]);
        return result;
    }
};

module.exports = Turma;