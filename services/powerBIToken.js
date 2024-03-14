const utils = require("../src/utils");

module.exports = {
    getToken
};

async function getToken() {
    configCheckResult = utils.validateConfig();
    
    if (configCheckResult) {
        return{
            status: 400,
            error: configCheckResult
        };
    }

    return{
        status: 200,
        mensaje: "Token enviado."
    };
}