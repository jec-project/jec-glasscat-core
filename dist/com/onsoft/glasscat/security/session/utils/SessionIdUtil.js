"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SessionIdBuilder_1 = require("./SessionIdBuilder");
class SessionIdUtil {
    static parseSessionIdCookie(cookies) {
        const rawSessionId = cookies[SessionIdUtil.SESSION_ID_NAME];
        let sessionId = null;
        let buffer = null;
        let len = -1;
        let sessionIdParams = null;
        let sessionIdParamsSepId = -1;
        let sessionIdProp = null;
        let sessionIdBuilder = null;
        if (rawSessionId) {
            sessionIdBuilder = new SessionIdBuilder_1.SessionIdBuilder();
            if (rawSessionId.indexOf(SessionIdUtil.SEPARATOR) === -1) {
                sessionId = sessionIdBuilder.buildSessionId(rawSessionId);
            }
            else {
                buffer = rawSessionId.split(SessionIdUtil.SEPARATOR);
                sessionId = sessionIdBuilder.buildSessionId(buffer.shift());
                len = buffer.length;
                while (len--) {
                    sessionIdParams = buffer[len];
                    sessionIdParamsSepId =
                        sessionIdParams.indexOf(SessionIdUtil.PARAM_SEPARATOR);
                    sessionIdProp = sessionIdParams.substring(0, sessionIdParamsSepId);
                    sessionId[sessionIdProp] =
                        sessionIdParams.substring(sessionIdParamsSepId + 1);
                }
            }
        }
        return sessionId;
    }
    static stringifySessionId(sessionId) {
        const authurl = sessionId.authurl;
        let result = sessionId.getId();
        if (authurl)
            result += ":authurl=" + authurl;
        return result;
    }
}
SessionIdUtil.SEPARATOR = ":";
SessionIdUtil.PARAM_SEPARATOR = "=";
SessionIdUtil.SESSION_ID_NAME = "JSSESSIONID";
SessionIdUtil.COOKIES = "cookies";
exports.SessionIdUtil = SessionIdUtil;
