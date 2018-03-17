"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GlassCatSession_1 = require("../GlassCatSession");
class SessionBuilder {
    constructor() { }
    buildSession(sessionId, sessionOwner) {
        const session = new GlassCatSession_1.GlassCatSession();
        session.sessionId = sessionId;
        session.sessionOwner = sessionOwner;
        return session;
    }
}
exports.SessionBuilder = SessionBuilder;
