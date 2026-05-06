const db = require('../config/db');

const User = {
  // Busca o usuário pelo e-mail no MySQL
  findByEmail: async (email) => {
    const [rows] = await db.query(
  "SELECT id, nome, email, senha, nivel, turma_id FROM usuarios WHERE email = ?",
  [email]
);
    return rows[0];
  }
};

module.exports = User;