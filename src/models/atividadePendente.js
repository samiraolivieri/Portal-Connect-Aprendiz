const db = require('../config/db');

const AtividadePendente = {
  // Busca as atividades de um aluno específico
  findByUserId: async (userId) => {
    const query = 'SELECT * FROM atividades WHERE usuario_id = ?';
    const [rows] = await db.query(query, [userId]);
    return rows;
  }
};

module.exports = AtividadePendente;