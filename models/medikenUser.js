const { DataTypes } = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('MedikenUser', {
        codigoUsuario: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "Dsusucod",
            primaryKey: true 
        },
        nombres: {
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
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "Dsusuemail",
        },
        notifChangePass1: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: "Dsusunotifchngpass1",
        },
        notifChangePass2: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: "Dsusunotifchngpass2",
        },
        notifChangePass3: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: "Dsusunotifchngpass3",
        },
        notifChangePassDate1: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "Dsusunotifchngpassdate1",
        },
        notifChangePassDate2: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "Dsusunotifchngpassdate2",
        },
        notifChangePassDate3: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "Dsusunotifchngpassdate3",
        },
        img: {
            type: DataTypes.BLOB,
            allowNull: true,
            field: "Dsusuimg",
        },
        usuario: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "Dsusuide",
        },
        tokenReset: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "Dsusutokenresetpass",
        },
        tokenResetDate: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "Dsusutokenresetpassdate",
        },
        firstLogin: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: "Dsusufirstlogin",
        },
    }, {
        tableName: "DsUsuari",
        collate: "Modern_Spanish_CI_AS",
        schema: "dbo",
        timestamps: false
    });
}