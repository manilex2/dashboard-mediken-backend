const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const { getUser } = require("../services/auth");

router.post('/', async function (req, res) {
    try {
        var login = req.body;
        let user = await getUser(login);
        const accessToken = jwt.sign({
            user
        }, JWT_SECRET, { expiresIn: "6h" });
        res.status(200).send([{
            token: accessToken
        }]);
    } catch (error) {
        res.status(403).json({
            message: 'Usuario no autorizado. Verifique usuario y contraseña'
        });
    }
});

module.exports = router;