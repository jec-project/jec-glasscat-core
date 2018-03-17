"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DefaultRealmBuilder_1 = require("../../realms/utils/DefaultRealmBuilder");
const SessionIdUtil_1 = require("../../session/utils/SessionIdUtil");
class AbstractLoginModule {
    constructor() {
        this.__realm = null;
        this.__strategy = null;
        this.__loginStrategyConfig = null;
    }
    setLoginStrategy(strategy) {
        const builder = new DefaultRealmBuilder_1.DefaultRealmBuilder();
        const jsletContext = strategy.getJsletContext();
        this.__realm = builder.buildRealm(strategy.getLoginStrategyConfig(), jsletContext.getSecurityContext());
        this.__strategy = strategy;
        this.__loginStrategyConfig = strategy.getLoginStrategyConfig();
    }
    applyLoginStrategy(req, res, result) {
        result();
    }
    applyLogoutStrategy(req, res, result) {
        res.clearCookie(SessionIdUtil_1.SessionIdUtil.SESSION_ID_NAME);
        result();
    }
    applyAuthenticationStrategy(req, res, error, result) {
        result(error);
    }
    getCredentials(req) {
        return null;
    }
    authenticate(credentials, success, error) {
        this.__realm.authenticate(credentials, success, error);
    }
}
exports.AbstractLoginModule = AbstractLoginModule;
