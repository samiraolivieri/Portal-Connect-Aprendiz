const db = require('../config/db');

const Documento = {
  // Salva um novo documento no banco
  create: async ({ aprendiz_id, tipo, url_arquivo }) => {
    const query = `
      INSERT INTO documentos (aprendiz_id, tipo, url_arquivo, data_upload)
      VALUES (?, ?, ?, NOW())
    `;
    const [result] = await db.query(query, [aprendiz_id, tipo, url_arquivo]);
    return result.insertId;
  },

  // Busca todos os documentos de um aprendiz (com filtro opcional por tipo)
  findByAprendizId: async (aprendizId, tipo = null) => {
    let query = `
      SELECT id, aprendiz_id, tipo, url_arquivo, data_upload
      FROM documentos
      WHERE aprendiz_id = ?
    `;
    const params = [aprendizId];

    if (tipo) {
      query += ` AND tipo = ?`;
      params.push(tipo);
    }

    query += ` ORDER BY data_upload DESC`;

    const [rows] = await db.query(query, params);
    return rows;
  },

  // Busca um documento específico pelo id
  findById: async (id) => {
    const query = `
      SELECT id, aprendiz_id, tipo, url_arquivo, data_upload
      FROM documentos
      WHERE id = ?
    `;
    const [rows] = await db.query(query, [id]);
    return rows[0];
  },

  // Deleta um documento pelo id
  deleteById: async (id) => {
    const query = `DELETE FROM documentos WHERE id = ?`;
    const [result] = await db.query(query, [id]);
    return result.affectedRows;
  }
};

module.exports = Documento;