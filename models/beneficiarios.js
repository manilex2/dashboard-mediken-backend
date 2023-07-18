const { DataTypes } = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('Beneficiario', {
        usuario: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "beveIde",
            primaryKey: true 
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "bevenom",
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "beveape",
        },
        nose1: {
            type: DataTypes.NUMBER,
            allowNull: false,
            field: "bevecob",
        },
        nose2: {
            type: DataTypes.NUMBER,
            allowNull: false,
            field: "bevesalcob",
        },
        nose3: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "bevesus",
        },
        nose4: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "beveven",
        },
        nose5: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "beveexc",
        },
        condicion: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "bevedet",
        },
        nose7: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "beveusrlog",
        },
        nose8: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "bevefeclog",
        },
        nose9: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "bevehralog",
        },
        fechaInclu: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "bevefecinc",
        },
        fechaNac: {
            type: DataTypes.DATE,
            allowNull: true,
            field: "bevefecnac",
        },
        numContrato: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "bevecnt",
        },
        secuencialContrato: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "bevecntsec",
        },
        secuencialBeneficiario: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "bevebensec",
        },
        sexo: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "bevesex",
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "bevetip",
        },
        clave: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "bevecont",
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "beveema",
        },
        codOfic: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "beveoficod",
        },
        clientID: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "bevecliid",
        },
    }, {
        tableName: "Beneficiarios",
        collate: "Modern_Spanish_CI_AS",
        schema: "dbo",
        timestamps: false
    });
}