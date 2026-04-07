const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Usuario = require('./usuario'); // Importante para saber quem postou

const Comunicado = db.define('comunicados', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    autor_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: { model: 'usuarios', key: 'id' }
    },
    titulo: { type: DataTypes.STRING(50), allowNull: false },
    conteudo: { type: DataTypes.STRING(255), allowNull: false },
    tipo_alvo: { type: DataTypes.STRING(100), allowNull: false }, // Ex: "Todos", "Aprendiz", "Gestor"
    data_publicacao: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, {
    timestamps: false // Já que você está usando 'data_publicacao' manual
});

// Associação: Um comunicado pertence a um usuário (autor)
Comunicado.belongsTo(Usuario, { foreignKey: 'autor_id', as: 'autor' });

module.exports = Comunicado;