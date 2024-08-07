// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
// ----------------------------------------------------------------------------

const { msal, powerbi } = require("../helpers/keys");

function getAuthHeader(accessToken) {

    // Function to append Bearer against the Access Token
    return "Bearer ".concat(accessToken);
}

function validateConfig() {

    // Validation function to check whether the Configurations are available in the keys.js file or not

    let guid = require("guid");

    if (!msal.authenticationMode) {
        return "AuthenticationMode is empty. Please choose MasterUser or ServicePrincipal in keys.js.";
    }

    if (msal.authenticationMode.toLowerCase() !== "masteruser" && msal.authenticationMode.toLowerCase() !== "serviceprincipal") {
        return "AuthenticationMode is wrong. Please choose MasterUser or ServicePrincipal in keys.js";
    }

    if (!msal.clientId) {
        return "ClientId is empty. Please register your application as Native app in https://dev.powerbi.com/apps and fill Client Id in keys.js.";
    }

    if (!guid.isGuid(msal.clientId)) {
        return "ClientId must be a Guid object. Please register your application as Native app in https://dev.powerbi.com/apps and fill Client Id in keys.js.";
    }

    if (!powerbi.reportId) {
        return "ReportId is empty. Please select a report you own and fill its Id in keys.js.";
    }

    if (!guid.isGuid(powerbi.reportId)) {
        return "ReportId must be a Guid object. Please select a report you own and fill its Id in keys.js.";
    }

    if (!powerbi.workspaceId) {
        return "WorkspaceId is empty. Please select a group you own and fill its Id in keys.js.";
    }

    if (!guid.isGuid(powerbi.workspaceId)) {
        return "WorkspaceId must be a Guid object. Please select a workspace you own and fill its Id in keys.js.";
    }

    if (!msal.authorityUrl) {
        return "AuthorityUrl is empty. Please fill valid AuthorityUrl in keys.js.";
    }

    if (msal.authenticationMode.toLowerCase() === "masteruser") {
        if (!powerbi.pbiUsername || !powerbi.pbiUsername.trim()) {
            return "PbiUsername is empty. Please fill Power BI username in keys.js.";
        }

        if (!powerbi.pbiPassword || !powerbi.pbiPassword.trim()) {
            return "PbiPassword is empty. Please fill password of Power BI username in keys.js.";
        }
    } else if (msal.authenticationMode.toLowerCase() === "serviceprincipal") {
        if (!msal.clientSecret || !msal.clientSecret.trim()) {
            return "ClientSecret is empty. Please fill Power BI ServicePrincipal ClientSecret in keys.js.";
        }

        if (!msal.tenantId) {
            return "TenantId is empty. Please fill the TenantId in keys.js.";
        }

        if (!guid.isGuid(msal.tenantId)) {
            return "TenantId must be a Guid object. Please select a workspace you own and fill its Id in keys.js.";
        }
    }
}

module.exports = {
    getAuthHeader: getAuthHeader,
    validateConfig: validateConfig,
}