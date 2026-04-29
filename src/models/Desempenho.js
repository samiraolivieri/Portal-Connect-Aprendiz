const db = require('../config/db');
 
const DesempenhoModel = {
    getRelatorioGeral: async () => {
        const query = `
    SELECT
        u.id,
        u.nome,
        IFNULL(AVG(d.frequencia_mensal), 0) as media_frequencia, -- Ajustado para 'mensal'
        IFNULL(AVG(d.nota_tecnica), 0) as media_academica
    FROM usuarios u
    LEFT JOIN desempenho_aprendiz d ON u.id = d.aprendiz_id
    WHERE u.nivel = 'aprendiz'
    GROUP BY u.id, u.nome;
`;
        // Certifique-se de que sua conexão 'db' suporta Promises (usando mysql2/promise)
        const [results] = await db.query(query);
        return results;
    }
};
 
module.exports = DesempenhoModel;