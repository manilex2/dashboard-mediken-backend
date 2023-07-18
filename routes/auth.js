const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const { getUser } = require("../services/auth");

router.post('/', async function (req, res) {
    try {
        var login = req.body;
        /* let user = await getUser(login);
        const accessToken = jwt.sign({
            user
        }, JWT_SECRET, { expiresIn: "6h" });
        res.status(200).send([{
            token: accessToken
        }]); */
        if((login.usuario === "00001" && login.clave === "NOLOSE") || (login.usuario === "00003" && login.clave === ".")) {
            if (login.usuario === "00001") {
                login.nombre = "ADMIN";
                login.nose1 = "T";
                login.tipo = "A";
            } else {
                login.nombre = "LUIS CHANCAY";
                login.nose1 = "T";
                login.tipo = "L";
            }
            delete login.clave;
            login.tipoUsuario = "Mediken";
            let user = login;
            const accessToken = jwt.sign({
                user
            }, JWT_SECRET, { expiresIn: "6h" });
            res.status(200).send([{
                token: accessToken
            }]);
        } else if ((login.usuario === "0100161801" && login.clave === "0100161801") || (login.usuario === "0100318450" && login.clave === "0100318450")) {
            if (login.usuario === "0100161801") {
                login.nombre = "CARLOS ALEJANDRO";
                login.apellido = "DAVILA CALDERON";
                login.condicion = "";
                login.fechaInclu = new Date("2018-03-20 00:00:00.000");
                login.fechaNac = new Date("1923-08-08");
                login.numContrato = "00011888";
                login.secuencialContrato = "001";
                login.secuencialBeneficiario = "002";
                login.sexo = "M";
                login.tipo = "";
                login.email = "solrodaes@gmail.com";
                login.codOfi = "001";
                login.clientID = "0100161801";
            } else {
                login.nombre = "LUIS ORLANDO";
                login.apellido = "CARRION GALLARDO";
                login.condicion = "";
                login.fechaInclu = new Date("1990-01-02 00:00:00.000");
                login.fechaNac = new Date("1923-08-08");
                login.numContrato = "99600016";
                login.secuencialContrato = "001";
                login.secuencialBeneficiario = "001";
                login.sexo = "M";
                login.tipo = "";
                login.email = "lorcarrion@yahoo.com";
                login.codOfi = "001";
                login.clientID = "0100318450";
            }
            delete login.clave;
            login.tipoUsuario = "Beneficiario";
            let user = login;
            const accessToken = jwt.sign({
                user
            }, JWT_SECRET, { expiresIn: "6h" });
            res.status(200).send([{
                token: accessToken
            }]);
        } else {
            throw error;
        }
    } catch (error) {
        res.status(403).json({
            message: 'Usuario no autorizado. Verifique usuario y contraseña'
        });
    }
});

module.exports = router;