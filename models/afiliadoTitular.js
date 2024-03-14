const { DataTypes } = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('AfiliadoTitular', {
        usuario: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "ClRgIde",
            primaryKey: true 
        },
        contrato: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "ClRgcnt",
            primaryKey: true 
        },
        secuencial: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "ClRgcnsc",
            primaryKey: true 
        },
        nombres: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "ClRgnom",
        },
        apellidos: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "ClRgape",
        },
        solicitud: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "ClRgcnso",
        },
        statusCliente: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "ClRgSta",
        },
        fechaUltAct: {
            type: DataTypes.DATE,
            allowNull: true,
            field: "ClRgfcUA",
        },
        nose1: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "ClRgIdUA",
        },
        horaUltAct: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "ClRgHrUA",
        },
        tipoCuenta: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "ClRgTTpCt",
        },
        nose2: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "ClRgTNum",
        },
        nose3: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "ClRgTNom",
        },
        identificacion: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "ClRgTIde",
        },
        fechaLog: {
            type: DataTypes.DATE,
            allowNull: true,
            field: "ClRgfeclog",
        },
        suspendido: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "ClRgSus",
        },
        codBanco: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "RgmBco",
        },
        nose4: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "ClRgFnum",
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "ClRgFdir",
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "ClRgFema",
        },
        oficina: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "ClRgofi",
        },
        emailBroker: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "ClRgBrok",
        },
        clave: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "ClRgcon",
        },
        notifChangePass1: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: "ClRgnotifchngpass1",
        },
        notifChangePass2: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: "ClRgnotifchngpass2",
        },
        notifChangePass3: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: "ClRgnotifchngpass3",
        },
        notifChangePassDate1: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "ClRgnotifchngpassdate1",
        },
        notifChangePassDate2: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "ClRgnotifchngpassdate2",
        },
        notifChangePassDate3: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "ClRgnotifchngpassdate3",
        },
        img: {
            type: DataTypes.BLOB,
            allowNull: true,
            field: "ClRgimg",
        },
        tokenReset: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "ClRgtokenresetpass",
        },
        tokenResetDate: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "ClRgtokenresetpassdate",
        },
        firstLogin: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: "ClRgfirstlogin",
        },
    }, {
        tableName: "RgmClie",
        collate: "Modern_Spanish_CI_AS",
        schema: "dbo",
        timestamps: false
    });
}