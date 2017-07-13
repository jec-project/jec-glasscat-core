"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const AbstractLoginModule_1 = require("./AbstractLoginModule");
const SessionIdUtil_1 = require("../../session/utils/SessionIdUtil");
const CredentialsBuilder_1 = require("../../session/utils/CredentialsBuilder");
class BasicModule extends AbstractLoginModule_1.AbstractLoginModule {
    constructor() {
        super();
    }
    buildRealm() {
        let response = "Basic realm=\""
            + this.__loginStrategyConfig.getSecuredArea() + "\"";
        return response;
    }
    buildUnauthorizedResponse(res) {
        res.setHeader("WWW-Authenticate", this.buildRealm());
        res.sendStatus(jec_commons_1.HttpStatusCode.UNAUTHORIZED);
    }
    applyLoginStrategy(req, res, result) {
        let auth = req.getHeader(BasicModule.AUTHORIZATION);
        let properties = res.getLocalProperties();
        if (auth) {
            this.__strategy.authenticate(req, res, result);
        }
        else {
            this.buildUnauthorizedResponse(res);
            result();
        }
    }
    applyLogoutStrategy(req, res, result) {
        res.clearCookie(SessionIdUtil_1.SessionIdUtil.SESSION_ID_NAME);
        res.setHeader("WWW-Authenticate", this.buildRealm());
        res.status(jec_commons_1.HttpStatusCode.UNAUTHORIZED);
        result();
    }
    applyAuthenticationStrategy(req, res, error, result) {
        let properties = res.getLocalProperties();
        if (error) {
            this.buildUnauthorizedResponse(res);
        }
        else {
            res.redirect(properties.sessionId.authurl);
        }
        result(error);
    }
    getCredentials(req) {
        let credentials = null;
        let auth = req.getHeader(BasicModule.AUTHORIZATION);
        let encoded = null;
        let decoded = null;
        let user = null;
        let password = null;
        let sepId = -1;
        let builder = null;
        if (auth) {
            builder = new CredentialsBuilder_1.CredentialsBuilder();
            encoded = auth.substr(BasicModule.BASIC.length);
            decoded = Buffer.from(encoded, jec_commons_1.EncodingFormat.BASE64).toString();
            sepId = decoded.indexOf(BasicModule.SEPARATOR);
            user = decoded.substr(0, sepId);
            password = decoded.substr(sepId + 1);
            credentials = builder.build(user, password);
        }
        return credentials;
    }
}
BasicModule.AUTHORIZATION = "authorization";
BasicModule.BASIC = "Basic ";
BasicModule.SEPARATOR = ":";
exports.BasicModule = BasicModule;
