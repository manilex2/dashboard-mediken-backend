const { DataTypes } = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('Broker', {
        usuario: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "dsvccod",
            primaryKey: true 
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "dsvcnom",
        },
        nose1: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "dsvcsta",
        },
        ruc: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "dsvcruc",
        },
        representante: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "dsvcrple",
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "dsvcema",
        },
        clave: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "dsvccon",
        },
    }, {
        tableName: "Dsbroker",
        collate: "Modern_Spanish_CI_AS",
        schema: "dbo",
        timestamps: false
    });
}