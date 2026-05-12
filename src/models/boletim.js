const db = require('../config/db');
 
const Boletin = {
  findByAprendizId: async (aprendizId) => {
    const query = `
      SELECT
        n.id,
        n.valor_nota AS nota,
        COALESCE(AVG(f.valor_frequencia), 0) AS frequencia,
        u.nome_uc
 
      FROM notas n
 
      INNER JOIN unidades_curriculares u
        ON n.uc_id = u.id
 
      LEFT JOIN frequencia f
        ON f.aluno_id = n.aluno_id
        AND f.uc_id = n.uc_id
 
      WHERE n.aluno_id = ?
 
      GROUP BY
        n.id,
        n.valor_nota,
        u.nome_uc
    `;
 
    try {
      const [rows] = await db.query(query, [aprendizId]);
      return rows;
    } catch (error) {
      console.error("Erro no SQL do Boletim:", error.message);
      throw error;
    }
  }
};
 
module.exports = Boletin;
 