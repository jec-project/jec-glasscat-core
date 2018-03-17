"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GlassCatSessionId_1 = require("../GlassCatSessionId");
class SessionIdBuilder {
    constructor() { }
    buildSessionId(guid) {
        const sessionId = new GlassCatSessionId_1.GlassCatSessionId(guid);
        return sessionId;
    }
}
exports.SessionIdBuilder = SessionIdBuilder;
