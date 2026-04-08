const db = require('../config/db');

const Boletin = {
  // Busca o boletim completo de um aprendiz específico
  findByAprendizId: async (aprendizId) => {
    const query = `
      SELECT b.id, b.nota, b.frequencia_p, u.nome as uc_nome 
      FROM boletins b
      JOIN ucs u ON b.uc_id = u.id
      WHERE b.aprendiz_id = ?
    `;
    const [rows] = await db.query(query, [aprendizId]);
    return rows;
  }
};

module.exports = Boletin;