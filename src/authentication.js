// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
// ----------------------------------------------------------------------------

const getAccessToken = async function () {
    // Create a config variable that store credentials from keys.js
    const config = require("../helpers/keys");

    // Use MSAL.js for authentication
    const msal = require("@azure/msal-node");

    const msalConfig = {
        auth: {
            clientId: config.msal.clientId,
            authority: `${config.msal.authorityUrl}${config.msal.tenantId}`,
        }
    };

    // Check for the MasterUser Authentication
    if (config.authenticationMode.toLowerCase() === "masteruser") {
        const clientApplication = new msal.PublicClientApplication(msalConfig);

        const usernamePasswordRequest = {
            scopes: [config.powerbi.scopeBase],
            username: config.powerbi.pbiUsername,
            password: config.powerbi.pbiPassword
        };

        return clientApplication.acquireTokenByUsernamePassword(usernamePasswordRequest);

    };

    // Service Principal auth is the recommended by Microsoft to achieve App Owns Data Power BI embedding
    if (config.authenticationMode.toLowerCase() === "serviceprincipal") {
        msalConfig.auth.clientSecret =  config.msal.clientSecret
        const clientApplication = new msal.ConfidentialClientApplication(msalConfig);

        const clientCredentialRequest = {
            scopes: [config.powerbi.scopeBase],
        };

        return clientApplication.acquireTokenByClientCredential(clientCredentialRequest);
    }
}

module.exports.getAccessToken = getAccessToken;