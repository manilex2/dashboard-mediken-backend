const { DataTypes } = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('Broker', {
        codigoBrokerComp: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "dsvccod",
            primaryKey: true 
        },
        nombres: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "dsvcnom",
        },
        statusBroker: {
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
        notifChangePass1: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: "dsvcnotifchngpass1",
        },
        notifChangePass2: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: "dsvcnotifchngpass2",
        },
        notifChangePass3: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: "dsvcnotifchngpass3",
        },
        notifChangePassDate1: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "dsvcnotifchngpassdate1",
        },
        notifChangePassDate2: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "dsvcnotifchngpassdate2",
        },
        notifChangePassDate3: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "dsvcnotifchngpassdate3",
        },
        img: {
            type: DataTypes.BLOB,
            allowNull: true,
            field: "dsvcimg",
        },
        usuario: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "dsvcide",
        },
        tokenReset: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "dsvctokenresetpass",
        },
        tokenResetDate: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "dsvctokenresetpassdate",
        },
        firstLogin: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: "dsvcfirstlogin",
        },
    }, {
        tableName: "Dsbroker",
        collate: "Modern_Spanish_CI_AS",
        schema: "dbo",
        timestamps: false
    });
}