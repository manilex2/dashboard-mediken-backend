const { DataTypes } = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('Solicitud', {
        solicitud: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "DsSocod",
            primaryKey: true 
        },
        secuencialSolicitud: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "DsSoSec",
            primaryKey: true 
        },
        fechaRenovacion: {
            type: DataTypes.DATE,
            allowNull: true,
            field: "DsSoFecRnv", 
        },
    }, {
        tableName: "DsSolicit",
        collate: "Modern_Spanish_CI_AS",
        schema: "dbo",
        timestamps: false
    });
}