"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EjpFormModule_1 = require("./modules/EjpFormModule");
const BasicModule_1 = require("./modules/BasicModule");
const jec_exchange_1 = require("jec-exchange");
const SessionIdUtil_1 = require("../session/utils/SessionIdUtil");
class LoginStrategy {
    constructor(strategyConfig) {
        this._strategyConfig = null;
        this._loginModule = null;
        this._jsletContext = null;
        this._sessionContext = null;
        this.init(strategyConfig);
    }
    init(strategyConfig) {
        this._strategyConfig = strategyConfig;
        let authMethod = this._strategyConfig.getAuthMethod();
        switch (authMethod) {
            case jec_exchange_1.AuthMethod.EJP_FORM:
                this._loginModule = new EjpFormModule_1.EjpFormModule();
                break;
            case jec_exchange_1.AuthMethod.BASIC:
                this._loginModule = new BasicModule_1.BasicModule();
                break;
            case jec_exchange_1.AuthMethod.DIGEST:
            case jec_exchange_1.AuthMethod.FORM:
            case jec_exchange_1.AuthMethod.NONE:
            default:
        }
    }
    initStrategy(container) {
        if (this._loginModule) {
            this._jsletContext = container.getJsletContext();
            this._sessionContext = this._jsletContext.getSessionContext();
            this._loginModule.setLoginStrategy(this);
        }
    }
    applyLoginStrategy(req, res, result) {
        this._loginModule.applyLoginStrategy(req, res, result);
    }
    getLoginStrategyConfig() {
        return this._strategyConfig;
    }
    getJsletContext() {
        return this._jsletContext;
    }
    authenticate(req, res, result) {
        this._loginModule.authenticate(this._loginModule.getCredentials(req), (owner) => {
            this._sessionContext.initSession(req, owner, (err) => {
                this._loginModule.applyAuthenticationStrategy(req, res, err, result);
            });
        }, (err) => {
            this._loginModule.applyAuthenticationStrategy(req, res, err, result);
        });
    }
    invalidateSession(req, res, result) {
        let cookies = req.getCookies();
        let sessionId = SessionIdUtil_1.SessionIdUtil.parseSessionIdCookie(cookies);
        this._sessionContext.unloadSession(sessionId, (err) => {
            this._loginModule.applyLogoutStrategy(req, res, result);
        });
    }
}
exports.LoginStrategy = LoginStrategy;
