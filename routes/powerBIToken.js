const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET = process.env.JWT_SECRET_KEY;
const { getToken } = require("../services/powerBIToken");
let embedToken = require("../src/embedConfigService");

router.get('/getEmbedToken', async function (req, res) {
    await getToken();
    
    let result = await embedToken.getEmbedInfo();

    res.status(result.status).send(result);
});

module.exports = router;