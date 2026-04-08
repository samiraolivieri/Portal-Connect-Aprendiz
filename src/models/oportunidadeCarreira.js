const { DataTypes } = require('sequelize');
const db = require('../config/db');

const OportunidadeCarreira = db.define('oportunidades_carreira', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    aprendiz_id: { type: DataTypes.INTEGER, allowNull: false },
    descricao: { type: DataTypes.STRING(255), allowNull: false },
    link_externo: { type: DataTypes.STRING(255), allowNull: false },
    data_expiracao: { type: DataTypes.DATEONLY, allowNull: false }
}, {
    timestamps: false
});

module.exports = OportunidadeCarreira;