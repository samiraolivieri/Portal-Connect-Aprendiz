const db = require('../config/db');

const Contato = {
  // Busca a lista de contatos dos gestores/pedagogos
  findAll: async () => {
    // Aqui fazemos uma busca simples na tabela contatos
    const query = 'SELECT * FROM contatos';
    const [rows] = await db.query(query);
    return rows;
  }
};

module.exports = Contato;