const db = require('../config/db');

const OportunidadeCarreira = {
  // Busca todas as vagas do Portal Carreiras
  findAll: async () => {
    const query = 'SELECT * FROM oportunidades_carreira';
    const [rows] = await db.query(query);
    return rows;
  }
};

module.exports = OportunidadeCarreira;