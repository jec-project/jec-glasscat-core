"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicSessionError_1 = require("../errors/BasicSessionError");
class SessionErrorBuilder {
    constructor() { }
    build(sessionId, type, message) {
        const error = new BasicSessionError_1.BasicSessionError(sessionId, type, message);
        return error;
    }
}
exports.SessionErrorBuilder = SessionErrorBuilder;
