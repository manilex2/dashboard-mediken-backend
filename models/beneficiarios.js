const { DataTypes } = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('Beneficiario', {
        usuario: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "beveIde",
            primaryKey: true 
        },
        nombres: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "bevenom",
        },
        apellidos: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "beveape",
        },
        cobertura: {
            type: DataTypes.NUMBER,
            allowNull: false,
            field: "bevecob",
        },
        saldoCobertura: {
            type: DataTypes.NUMBER,
            allowNull: false,
            field: "bevesalcob",
        },
        suspendido: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "bevesus",
        },
        nose1: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "beveven",
        },
        statusExcluido: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "beveexc",
        },
        diagnostico: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "bevedet",
        },
        usuarioLog: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "beveusrlog",
        },
        fechaLog: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "bevefeclog",
        },
        horaLog: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "bevehralog",
        },
        fechaInclusion: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "bevefecinc",
        },
        fechaNacimiento: {
            type: DataTypes.DATE,
            allowNull: true,
            field: "bevefecnac",
        },
        contrato: {
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
        genero: {
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
        oficina: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "beveoficod",
        },
        cedula: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "bevecliid",
        },
        notifChangePass1: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: "bevenotifchngpass1",
        },
        notifChangePass2: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: "bevenotifchngpass2",
        },
        notifChangePass3: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: "bevenotifchngpass3",
        },
        notifChangePassDate1: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "bevenotifchngpassdate1",
        },
        notifChangePassDate2: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "bevenotifchngpassdate2",
        },
        notifChangePassDate3: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "bevenotifchngpassdate3",
        },
        img: {
            type: DataTypes.BLOB,
            allowNull: true,
            field: "beveimg",
        },
        tokenReset: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "bevetokenresetpass",
        },
        tokenResetDate: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "bevetokenresetpassdate",
        },
        firstLogin: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: "bevefirstlogin",
        },
    }, {
        tableName: "Beneficiarios",
        collate: "Modern_Spanish_CI_AS",
        schema: "dbo",
        timestamps: false
    });
}