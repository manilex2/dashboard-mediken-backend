const { DataTypes } = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('SolicitudBeneficiario', {
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
        secuencialBeneficiario: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "DsBeSec",
            primaryKey: true 
        },
        genero: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "DsBeSex",
        },
        fechaExclusion: {
            type: DataTypes.DATE,
            allowNull: true,
            field: "DsBeFecExc",
        },
        fechaInclusion: {
            type: DataTypes.DATE,
            allowNull: true,
            field: "DsBeFecInc",
        },
        nombres: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "DsBeNom",
        },
        apellidos: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "DsBeApe",
        },
        fechaNacimiento: {
            type: DataTypes.DATE,
            allowNull: true,
            field: "DsBeFecNac",
        },
        periodoCarencia: {
            type: DataTypes.NUMBER,
            allowNull: true,
            field: "DsBePerCar",
        },
        statusBeneficiario: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "DsBeEst",
        },
        cuotaBeneficiario: {
            type: DataTypes.NUMBER,
            allowNull: true,
            field: "DsBeValBas",
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "DsBeEma",
        },
        telBeneficiario: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "DsBenumtel",
        },
    }, {
        tableName: "DsSoBenf",
        collate: "Modern_Spanish_CI_AS",
        schema: "dbo",
        timestamps: false
    });
}