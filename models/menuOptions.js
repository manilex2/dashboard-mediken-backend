const { DataTypes } = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('MenuOptions', {
        id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            field: "opcionesMenuGSAid",
            primaryKey: true 
        },
        nombreMostrar: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "opcionesMenuGSADes",
        },
        posicion: {
            type: DataTypes.NUMBER,
            allowNull: false,
            field: "opcionesMenuGSAPos",
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "opcionesMenuGSAMod",
        },
        estado: {
            type: DataTypes.NUMBER,
            allowNull: false,
            field: "opcionesMenuGSAEst",
        },
        url: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "opcionesMenuGSAUrl",
        },
    }, {
        tableName: "opcionesMenuGSA",
        collate: "Modern_Spanish_CI_AS",
        schema: "dbo",
        timestamps: false
    });
}