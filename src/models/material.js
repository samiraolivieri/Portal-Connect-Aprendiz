const db = require('../config/db');

const Material = {
    // Função para inserir um novo material
    create: async (data) => {
        const { titulo, descricao, link_material, turma_id, arquivo_path } = data;
        
        const sql = 'INSERT INTO materiais (titulo, descricao, link_material, turma_id, arquivo_path) VALUES (?, ?, ?, ?, ?)';
        
        const [result] = await db.query(sql, [titulo, descricao, link_material, turma_id, arquivo_path]);
        return result;
    },

    // Função para buscar os últimos 10 materiais enviados
    getAll: async () => {
        // Ordenamos por 'id DESC' para pegar sempre os mais recentes primeiro
        const sql = 'SELECT * FROM materiais ORDER BY id DESC LIMIT 10';
        
        const [rows] = await db.query(sql);
        return rows;
    }
};

module.exports = Material;