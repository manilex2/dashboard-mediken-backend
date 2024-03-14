const express = require('express');
const router = express.Router();
const { getToken } = require("../services/powerBIToken");
let embedToken = require("../src/embedConfigService");
const { jwtDecode } = require("jwt-decode");

router.get('/getToken', async function (req, res) {
    try {
        const bearerToken = req.headers.authorization;
        const token = bearerToken.split(' ')[1];
        const decodeToken = jwtDecode(token);
        const tipoUsuario = decodeToken.user.tipoUsuario;
        const configSuccess = await getToken();
        if (configSuccess.status != 200) {
            throw configSuccess;
        }
        const result = await embedToken.getEmbedInfo(tipoUsuario);
        res.status(result.status).send(result);
    } catch (error) {
        res.status(403).send({
            message: 'No se pudo obtener el token: ' + error
        })
    }
});

module.exports = router;