const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Ministerio = sequelize.define('Ministerio', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Ministerio;
