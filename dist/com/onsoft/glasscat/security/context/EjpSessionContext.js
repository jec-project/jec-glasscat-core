"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggerManager_1 = require("../../util/logging/LoggerManager");
const GlassCatLocaleManager_1 = require("../../i18n/GlassCatLocaleManager");
const jec_exchange_1 = require("jec-exchange");
const EjpSessionManager_1 = require("../session/managers/EjpSessionManager");
const SessionBuilder_1 = require("../session/utils/SessionBuilder");
const SessionUtil_1 = require("../session/utils/SessionUtil");
const SessionIdUtil_1 = require("../session/utils/SessionIdUtil");
const SessionStorageSolver_1 = require("../session/utils/SessionStorageSolver");
const SessionErrorBuilder_1 = require("../session/utils/SessionErrorBuilder");
class EjpSessionContext {
    constructor(contextRoot, config) {
        this._contextRoot = null;
        this._sessionManager = null;
        this._sessionBuilder = null;
        this._sessionMap = null;
        this._maxAge = 5 * 60 * 1000;
        this._errorUrl = null;
        this._sessionErrorBuilder = null;
        this.init(contextRoot, config);
    }
    init(contextRoot, config) {
        this._contextRoot = contextRoot;
        this._sessionErrorBuilder = new SessionErrorBuilder_1.SessionErrorBuilder();
        this.initSessionManager(config.webapp.session);
        this._sessionMap = new Map();
    }
    initSessionManager(sessionConfig) {
        const sessionStorageSolver = new SessionStorageSolver_1.SessionStorageSolver();
        const sessionStorage = sessionStorageSolver.getSessionStorage(sessionConfig);
        this._sessionBuilder = new SessionBuilder_1.SessionBuilder();
        this._sessionManager = new EjpSessionManager_1.EjpSessionManager();
        this._sessionManager.setSessionStorage(sessionStorage);
        if (sessionConfig.errorUrl)
            this._errorUrl = sessionConfig.errorUrl;
        if (sessionConfig.maxAge) {
            this._maxAge = Number(sessionConfig.maxAge) * 1000;
        }
    }
    processExpiredSession(sessionId, result) {
        this._sessionMap.delete(sessionId.getId());
        result(this._sessionErrorBuilder.build(sessionId, jec_exchange_1.SessionErrorType.SESSION_EXPIRED));
        this.unloadSession(sessionId, (err) => {
            if (err) {
                LoggerManager_1.LoggerManager.getInstance().error(GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance().get("errors.session.sessionStorageAccessError", err.toString()));
            }
        });
    }
    getContextRoot() {
        return this._contextRoot;
    }
    getErrorUrl() {
        return this._errorUrl;
    }
    invalidateSession(req, result) {
        const cookies = req.getCookies();
        const sessionId = SessionIdUtil_1.SessionIdUtil.parseSessionIdCookie(cookies);
        this.unloadSession(sessionId, result);
    }
    initSessionId() {
        return this._sessionManager.initSessionId();
    }
    initSession(req, sessionOwner, result) {
        const cookies = req.getCookies();
        const sessionId = SessionIdUtil_1.SessionIdUtil.parseSessionIdCookie(cookies);
        const session = this._sessionBuilder.buildSession(sessionId, sessionOwner);
        session.expires = SessionUtil_1.SessionUtil.getExirationTime(this._maxAge);
        this._sessionManager.addSession(session, (err) => {
            if (!err)
                this._sessionMap.set(sessionId.getId(), session);
            result(err);
        });
    }
    loadSession(sessionId, result) {
        const maxAge = Date.now();
        const id = sessionId.getId();
        if (this._sessionMap.has(id)) {
            const cached = this._sessionMap.get(id);
            if (cached.expires <= maxAge) {
                this.processExpiredSession(sessionId, result);
            }
            else
                result();
        }
        else {
            this._sessionManager.getSession(sessionId, (session) => {
                if (session.expires <= maxAge) {
                    this.processExpiredSession(sessionId, result);
                }
                else {
                    this._sessionMap.set(id, session);
                    result();
                }
            }, result);
        }
    }
    refreshSession(sessionId, data, result) {
        const session = this._sessionMap.get(sessionId.getId());
        if (session) {
            session.data = data;
            session.expires = SessionUtil_1.SessionUtil.getExirationTime(this._maxAge);
            this._sessionManager.addSession(session, result);
        }
        else {
            result(this._sessionErrorBuilder.build(sessionId, jec_exchange_1.SessionErrorType.INVALID_SESSION_ID));
        }
    }
    unloadSession(sessionId, result) {
        this._sessionMap.delete(sessionId.getId());
        this._sessionManager.removeSession(sessionId, result);
    }
    hasSession(sessionId) {
        return this._sessionMap.has(sessionId.getId());
    }
    getSession(sessionId) {
        return this._sessionMap.get(sessionId.getId());
    }
}
exports.EjpSessionContext = EjpSessionContext;
;
