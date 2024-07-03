// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
// ----------------------------------------------------------------------------

const getAccessToken = async function () {
    // Create a config variable that store credentials from keys.js
    const { msal, powerbi } = require("../helpers/keys");

    // Use MSAL.js for authentication
    const msalAzure = require("@azure/msal-node");

    const msalConfig = {
        auth: {
            clientId: msal.clientId,
            authority: `${msal.authorityUrl}${msal.tenantId}`,
        }
    };

    // Check for the MasterUser Authentication
    if (authenticationMode.toLowerCase() === "masteruser") {
        const clientApplication = new msalAzure.PublicClientApplication(msalConfig);

        const usernamePasswordRequest = {
            scopes: [powerbi.scopeBase],
            username: powerbi.pbiUsername,
            password: powerbi.pbiPassword
        };

        return clientApplication.acquireTokenByUsernamePassword(usernamePasswordRequest);

    };

    // Service Principal auth is the recommended by Microsoft to achieve App Owns Data Power BI embedding
    if (authenticationMode.toLowerCase() === "serviceprincipal") {
        msalauth.clientSecret =  msal.clientSecret
        const clientApplication = new msalAzure.ConfidentialClientApplication(msalConfig);

        const clientCredentialRequest = {
            scopes: [powerbi.scopeBase],
        };

        return clientApplication.acquireTokenByClientCredential(clientCredentialRequest);
    }
}

module.exports.getAccessToken = getAccessToken;