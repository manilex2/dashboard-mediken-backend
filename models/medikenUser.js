const { DataTypes } = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('MedikenUser', {
        usuario: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "Dsusucod",
            primaryKey: true 
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "Dsusunom",
        },
        nose1: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "DsUsustaac",
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "Dsusutip",
        },
        clave: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "Dsusucla",
        },
    }, {
        tableName: "DsUsuari",
        collate: "Modern_Spanish_CI_AS",
        schema: "dbo",
        timestamps: false
    });
}