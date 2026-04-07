const { DataTypes } = require('sequelize');
const db = require('../config/db'); 
const Unidade = require('./unidade'); // IMPORTANTE: Importar o model de Unidade

const Contato = db.define('contatos', {
    nome_setor: { type: DataTypes.STRING, allowNull: false },
    responsavel: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    telefone: { type: DataTypes.STRING },
    unidade_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: 'unidades', // Nome da tabela no banco
            key: 'id'
        }
    }
}, {
    timestamps: false 
});

// AQUI ESTÁ O SEGREDO: 
// Estamos dizendo que o Contato "Pertence a" (belongsTo) uma Unidade.
// Isso permite que o Sequelize faça o JOIN automático quando você usa 'include'.
Contato.belongsTo(Unidade, { foreignKey: 'unidade_id' });

module.exports = Contato;