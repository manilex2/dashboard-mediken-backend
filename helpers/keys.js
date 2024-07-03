require("dotenv").config();
module.exports.database = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    pwd: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    db: process.env.DB_DATABASE
}

module.exports.init = {
    origin_url: process.env.ORIGIN_URL,
    port: parseInt(process.env.PORT, 10) || 5300,
    NODE_ENV: process.env.NODE_ENV,
}

module.exports.jwt = {
    secret: process.env.JWT_SECRET_KEY
}

module.exports.gmail = {
    user: process.env.GMAIL_USER
}

module.exports.msal = {
    clientId: process.env.MSAL_CLIENT_ID,
    authorityUrl: process.env.MSAL_AUTHORITY_URL,
    tenantId: process.env.MSAL_TENANT_ID,
    authenticationMode: process.env.MSAL_AUTHENTICATION_MODE,
    clientSecret: process.env.MSAL_CLIENT_SECRET
}

module.exports.powerbi = {
    pbiUsername: process.env.PBI_USERNAME,
    pbiPassword: process.env.PBI_PASSWORD,
    workspaceId: process.env.PBI_WORKSPACE_ID,
    reportId: process.env.PBI_REPORT_ID,
    reportIdAfiLTit: process.env.PBI_REPORT_ID_AFIL_TIT,
    apiURL: process.env.PBI_API_URL,
    scopeBase: process.env.PBI_SCOPE_BASE,
}

module.exports.smtp2go = {
    username: process.env.SMTP2GO_USERNAME,
    password: process.env.SMTP2GO_PASSWORD,
    server: process.env.SMTP2GO_SERVER,
    emailServer: process.env.SMTP2GO_EMAILSERVER,
    port: process.env.SMTP2GO_PORT,
}