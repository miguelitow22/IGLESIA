const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Request = sequelize.define('Request', {
    tipoSolicitud: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaProyeccion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    ministerioId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING,
    },
    video: {
        type: DataTypes.STRING,
    },
    correoMinisterio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    informacion: {
        type: DataTypes.TEXT,
    },
    fechasImportantes: {
        type: DataTypes.TEXT,
    }
}, {
    timestamps: false
});

module.exports = Request;
