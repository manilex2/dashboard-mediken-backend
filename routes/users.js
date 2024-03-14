const express = require('express');
const router = express.Router();
const sharp = require("sharp");
const { jwtDecode } = require("jwt-decode");

const { updateFirstLogin, updatePassword, getProfileImg, updateProfileImg, getContratos, updatePassNotif } = require("../services/users");

router.put('/change-password/:usuario', async function (req, res) {
    try {
        const id = req.params.usuario;
        var user = req.body;
        const changePass = await updatePassword(id, user);
        res.status(200).send(changePass);
    } catch (error) {
        res.status(403).json({
            message: 'Error al cambiar contraseña' + error
        });
    }
});

router.put('/first-login/:usuario', async function (req, res) {
    try {
        const id = req.params.usuario;
        var user = req.body;
        if (user.img) {
            const imageBuffer = Buffer.from(
                user.img.toString().split(',')[1],
                'base64',
            );
            const compressedImageBuffer = await sharp(imageBuffer)
                .resize(200)
                .png()
                .toBuffer();
            user.img = compressedImageBuffer;
        }
        const userResult = await updateFirstLogin(id, user);
        res.status(200).send(userResult);
    } catch (error) {
        res.status(403).json({
            message: 'Error al actualizar el primer login' + error
        });
    }
});

router.put('/password-notification/:usuario', async function (req, res) {
    try {
        console.log("Entre aqui");
        const id = req.params.usuario;
        const userResult = await updatePassNotif(id);
        res.status(200).send(userResult);
    } catch (error) {
        res.status(403).json({
            message: 'Error al actualizar el primer login' + error
        });
    }
});

router.put('/img/:usuario', async function (req, res) {
    try {
        const id = req.params.usuario;
        var user = req.body;
        const imageBuffer = Buffer.from(
            user.img.toString().split(',')[1],
            'base64',
        );
        const compressedImageBuffer = await sharp(imageBuffer)
            .resize(200)
            .png()
            .toBuffer();
        const img = await updateProfileImg(id, compressedImageBuffer);
        res.status(200).send(img);
    } catch (error) {
        res.status(403).json({
            message: 'Error al agregar la imágen' + error
        });
    }
});

router.get('/img/:usuario', async function (req, res) {
    try {
        const id = req.params.usuario;
        const img = await getProfileImg(id);
        res.status(200).send(img);
    } catch (error) {
        res.status(403).json({
            message: 'Error al agregar la imágen: ' + error
        });
    }
});

router.get('/contratos', async function (req, res) {
    try {
        const bearerToken = req.headers.authorization;
        const token = bearerToken.split(' ')[1];
        const decodeToken = jwtDecode(token);
        const contratos = await getContratos(decodeToken.user);
        res.status(200).send(JSON.stringify(contratos));
    } catch (error) {
        res.status(403).json({
            message: 'Error al obtener los contratos: ' + error
        });
    }
});

module.exports = router;