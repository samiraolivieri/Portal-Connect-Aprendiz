const db = require('../config/db');

const UC = {
  // Lista todas as matérias/unidades curriculares
  findAll: async () => {
    const query = 'SELECT * FROM unidades_curriculares';
    const [rows] = await db.query(query);
    return rows;
  },

  // Busca uma UC específica pelo ID
  findById: async (id) => {
    const query = 'SELECT * FROM unidades_curriculares WHERE id = ?';
    const [rows] = await db.query(query, [id]);
    return rows[0];
  }
};

module.exports = UC;