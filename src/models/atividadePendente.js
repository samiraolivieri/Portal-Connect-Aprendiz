const { DataTypes } = require('sequelize');
const db = require('../config/db');

const AtividadePendente = db.define('atividades_pendentes', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    aprendiz_id: { type: DataTypes.INTEGER, allowNull: false },
    descricao: { type: DataTypes.STRING(255), allowNull: false },
    prazo: { type: DataTypes.DATEONLY, allowNull: false }, // DATEONLY para vir apenas YYYY-MM-DD
    concluida: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
    timestamps: false
});

module.exports = AtividadePendente;