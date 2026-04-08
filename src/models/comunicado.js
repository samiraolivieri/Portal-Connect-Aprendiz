const db = require('../config/db');

const Comunicado = {
  // Busca todos os avisos (Mural da Unidade)
  findAll: async () => {
    const query = 'SELECT * FROM comunicados ORDER BY data_postagem DESC';
    const [rows] = await db.query(query);
    return rows;
  }
};

module.exports = Comunicado;