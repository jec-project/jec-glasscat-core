"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SessionIdUtil_1 = require("../../../security/session/utils/SessionIdUtil");
class SessionUtil {
    static getExirationTime(maxAge) {
        const d = new Date();
        return d.setTime(d.getTime() + maxAge);
    }
    static setSessionCookie(res, sessionId, service) {
        const listener = service.getHttpListener();
        res.cookie(SessionIdUtil_1.SessionIdUtil.SESSION_ID_NAME, SessionIdUtil_1.SessionIdUtil.stringifySessionId(sessionId), {
            httpOnly: true,
            secure: listener.getSecured()
        });
    }
}
exports.SessionUtil = SessionUtil;
