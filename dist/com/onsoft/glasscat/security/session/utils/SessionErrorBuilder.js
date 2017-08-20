"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicSessionError_1 = require("../errors/BasicSessionError");
class SessionErrorBuilder {
    constructor() { }
    build(sessionId, errorType, message) {
        let error = new BasicSessionError_1.BasicSessionError(sessionId, errorType, message);
        return error;
    }
}
exports.SessionErrorBuilder = SessionErrorBuilder;
