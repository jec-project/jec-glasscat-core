"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const crypto = require("crypto");
const SessionIdBuilder_1 = require("../utils/SessionIdBuilder");
class EjpSessionManager {
    constructor() {
        this._guid = null;
        this.HASH_ALGORITHM = "sha256";
        this.OUTPUT_ENCODING = "hex";
        this._connector = null;
        this._sessionIdBuilder = null;
        this.init();
    }
    init() {
        let generator = new jec_commons_1.GuidGeneratorBase();
        this._guid = generator.generate();
        this._sessionIdBuilder = new SessionIdBuilder_1.SessionIdBuilder();
    }
    getSessionStorage() {
        return this._connector;
    }
    setSessionStorage(sessionStorage) {
        this._connector = sessionStorage;
    }
    initSessionId() {
        let sha = crypto.createHash(this.HASH_ALGORITHM)
            .update(Date.now() + this._guid);
        let sessionId = this._sessionIdBuilder.buildSessionId(sha.digest(this.OUTPUT_ENCODING));
        return sessionId;
    }
    addSession(session, result) {
        this._connector.add(session, result);
    }
    getSession(sessionId, success, error) {
        this._connector.get(sessionId, success, error);
    }
    removeSession(sessionId, result) {
        this._connector.remove(sessionId, result);
    }
}
exports.EjpSessionManager = EjpSessionManager;
