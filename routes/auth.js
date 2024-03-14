const express = require('express');
const router = express.Router();
const jwtWebToken = require("jsonwebtoken");
const { jwt } = require("../helpers/keys");

const { getUser, resetPassword, changePasswordReset } = require("../services/auth");

router.post('/', async function (req, res) {
    try {
        var login = req.body;
        let user = await getUser(login);
        const accessToken = jwtWebToken.sign({
            user
        }, jwt.secret, { expiresIn: "6h" });
        res.status(201).send([{
            token: accessToken
        }]);
    } catch (error) {
        res.status(403).json({
            message: 'Usuario no autorizado. Verifique usuario y contraseña'
        });
    }
});

router.post('/reset-password', async function (req, res) {
    try {
        var user = req.body;
        console.log("entre")
        const resetPass = await resetPassword(user);
        res.status(201).send(resetPass);
    } catch (error) {
        res.status(403).json({
            message: 'Error al resetear contraseña: ' + error
        });
    }
});

router.put('/change-password-reset', async function (req, res) {
    try {
        var user = req.body;
        const changePass = await changePasswordReset(user);
        res.status(200).send(changePass);
    } catch (error) {
        res.status(403).json({
            message: 'Error al cambiar contraseña: ' + error
        });
    }
});

module.exports = router;