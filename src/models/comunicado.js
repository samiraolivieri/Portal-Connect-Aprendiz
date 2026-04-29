const db = require('../config/db');

const Comunicado = {
  findAll: async () => {
    const query = `
      SELECT 
        c.id,
        c.titulo,
        c.conteudo AS descricao,
        c.data_publicacao AS data,
        'info' AS tipo,
        u.nome AS autor,
        NULL AS local,
        NULL AS horario,
        0 AS destaque,
        'novo' AS status
      FROM comunicados c
      JOIN usuarios u ON c.autor_id = u.id
      ORDER BY c.data_publicacao DESC
    `;

    const [rows] = await db.query(query);
    return rows;
  }
};

module.exports = Comunicado;