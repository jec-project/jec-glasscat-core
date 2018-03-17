"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const AbstractLoginModule_1 = require("./AbstractLoginModule");
const CredentialsBuilder_1 = require("../../session/utils/CredentialsBuilder");
class EjpFormModule extends AbstractLoginModule_1.AbstractLoginModule {
    constructor() {
        super();
    }
    applyLoginStrategy(req, res, result) {
        const properties = res.getLocalProperties();
        const url = properties.contextRootRef +
            this.__loginStrategyConfig.getFormProperties().getLoginUrl();
        res.redirect(url);
        result();
    }
    applyAuthenticationStrategy(req, res, error, result) {
        const properties = res.getLocalProperties();
        if (error) {
            res.status(jec_commons_1.HttpStatusCode.OK);
        }
        else {
            res.redirect(properties.sessionId.authurl);
        }
        result(error);
    }
    applyLogoutStrategy(req, res, result) {
        super.applyLogoutStrategy(req, res, result);
    }
    getCredentials(req) {
        const body = req.getBody();
        const builder = new CredentialsBuilder_1.CredentialsBuilder();
        const credentials = builder.build(body.js_username, body.js_password);
        return credentials;
    }
}
exports.EjpFormModule = EjpFormModule;
