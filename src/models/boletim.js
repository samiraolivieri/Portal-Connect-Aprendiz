const db = require('../config/db');

const Boletin = {
  findByAprendizId: async (aprendizId) => {
    const query = `
      SELECT 
        b.id, 
        b.nota, 
        b.frequencia_percentual, 
        u.nome_uc 
      FROM boletins b
      LEFT JOIN unidades_curriculares u ON b.uc_id = u.id
      WHERE b.aprendiz_id = ?
    `;
    try {
      const [rows] = await db.query(query, [aprendizId]);
      return rows;
    } catch (error) {
      console.error("Erro no SQL:", error.message);
      throw error;
    }
  }
};

module.exports = Boletin;