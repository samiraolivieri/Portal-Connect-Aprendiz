const db = require('../config/db');

const Unidade = {
  // Busca todas as unidades (ex: SENAI Maracanã, Jacarepaguá, etc.)
  findAll: async () => {
    const query = 'SELECT * FROM unidades';
    const [rows] = await db.query(query);
    return rows;
  },

  // Busca uma unidade específica pelo ID
  findById: async (id) => {
    const query = 'SELECT * FROM unidades WHERE id = ?';
    const [rows] = await db.query(query, [id]);
    return rows[0];
  }
};

module.exports = Unidade;