const utils = require("../src/utils");

module.exports = {
    getToken
};

async function getToken() {
    configCheckResult = utils.validateConfig();
    
    if (configCheckResult) {
        return res.status(400).send({
            "error": configCheckResult
        });
    }
}