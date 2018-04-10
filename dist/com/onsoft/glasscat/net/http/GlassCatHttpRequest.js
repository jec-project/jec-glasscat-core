"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GlassCatHttpRequest {
    constructor(req) {
        this.__expReq = null;
        this.init(req);
    }
    init(req) {
        this.__expReq = req;
    }
    getBaseUrl() {
        return this.__expReq.baseUrl;
    }
    getBody() {
        return this.__expReq["body"];
    }
    getCookies() {
        return this.__expReq["cookies"];
    }
    getHostname() {
        return this.__expReq.hostname;
    }
    getIp() {
        return this.__expReq.ip;
    }
    getMethod() {
        return this.__expReq.method;
    }
    getOriginalUrl() {
        return this.__expReq.originalUrl;
    }
    getPath() {
        return this.__expReq.path;
    }
    getProtocol() {
        return this.__expReq.protocol;
    }
    getQuery() {
        return this.__expReq.query;
    }
    isSecured() {
        return this.__expReq.secure;
    }
    accepts(type) {
        return this.__expReq.accepts(type) === type;
    }
    acceptsCharset(charset) {
        return this.__expReq.acceptsCharsets(charset) === charset;
    }
    acceptsEncoding(encoding) {
        return this.__expReq.acceptsEncodings(encoding);
    }
    acceptsLanguage(lang) {
        return this.__expReq.acceptsLanguages(lang) === lang;
    }
    getHeader(field) {
        return this.__expReq.get(field);
    }
    isTypeOfContent(type) {
        return this.__expReq.is(type);
    }
}
exports.GlassCatHttpRequest = GlassCatHttpRequest;
