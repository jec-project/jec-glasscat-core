"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BasicSessionError {
    constructor(sessionId, errorType, message) {
        this._sessionId = null;
        this._errorType = null;
        this._message = null;
        this.initObj(sessionId, errorType, message);
    }
    initObj(sessionId, errorType, message) {
        this._sessionId = sessionId;
        this._errorType = errorType;
        this._message = message;
    }
    getSessionId() {
        return this._sessionId;
    }
    getErrorType() {
        return this._errorType;
    }
    getMessage() {
        return this._message;
    }
    toString() {
        const result = "[Object::SessionError: sessionId=" +
            this._sessionId.getId() + " errorType=" +
            this._errorType + " message=" + this._message + "]";
        return result;
    }
}
exports.BasicSessionError = BasicSessionError;
