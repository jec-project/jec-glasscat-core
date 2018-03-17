"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_exchange_1 = require("jec-exchange");
const SessionErrorBuilder_1 = require("../utils/SessionErrorBuilder");
class LocalSessionStorage {
    constructor() {
        this._sessionMap = null;
        this._sessionMapTimer = -1;
        this._sessionMapTimerInterval = 60 * 60 * 1000;
        this._sessionErrorBuilder = null;
        this.initObj();
    }
    initObj() {
        this._sessionMap = new Map();
        this._sessionErrorBuilder = new SessionErrorBuilder_1.SessionErrorBuilder();
    }
    invalidateSessionMap() {
        let time = 0;
        this._sessionMap.forEach((value) => {
            time = Date.now();
            if (time < value.expires) {
                this._sessionMap.delete(value.sessionId.getId());
            }
        });
        this.checkSessionMapSize();
    }
    checkSessionMapSize() {
        if (this._sessionMap.size === 0) {
            clearInterval(this._sessionMapTimer);
            this._sessionMapTimer = -1;
        }
    }
    add(session, result) {
        this._sessionMap.set(session.sessionId.getId(), session);
        if (this._sessionMapTimer === -1) {
            this._sessionMapTimer = setInterval(this.invalidateSessionMap.bind(this), this._sessionMapTimerInterval);
        }
        result();
    }
    get(sessionId, success, error) {
        const session = this._sessionMap.get(sessionId.getId());
        if (session)
            success(session);
        else {
            error(this._sessionErrorBuilder.build(sessionId, jec_exchange_1.SessionErrorType.INVALID_SESSION_ID));
        }
    }
    remove(sessionId, result) {
        const id = sessionId.getId();
        const exists = this._sessionMap.has(id);
        if (exists) {
            this._sessionMap.delete(id);
            result();
        }
        else {
            result(this._sessionErrorBuilder.build(sessionId, jec_exchange_1.SessionErrorType.INVALID_SESSION_ID));
        }
        if (this._sessionMapTimer !== -1)
            this.checkSessionMapSize();
    }
    clearExpired() {
        this.invalidateSessionMap();
    }
}
exports.LocalSessionStorage = LocalSessionStorage;
