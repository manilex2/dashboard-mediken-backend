const { DataTypes } = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('MenuOptions', {
        id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            field: "opcionesMenuid",
            primaryKey: true 
        },
        nombreMostrar: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "opcionesMenuDes",
        },
        posicion: {
            type: DataTypes.NUMBER,
            allowNull: false,
            field: "opcionesMenuPos",
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "opcionesMenuMod",
        },
        estado: {
            type: DataTypes.NUMBER,
            allowNull: false,
            field: "opcionesMenuEst",
        },
        url: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "opcionesMenuUrl",
        },
        icono: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "opcionesMenuUrlIco",
        },
    }, {
        tableName: "OpcionesMenu",
        collate: "Modern_Spanish_CI_AS",
        schema: "dbo",
        timestamps: false
    });
}