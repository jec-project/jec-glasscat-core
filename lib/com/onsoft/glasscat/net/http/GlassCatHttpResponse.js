"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GlassCatHttpResponse {
    constructor(res) {
        this.__expRsq = null;
        this.init(res);
    }
    init(res) {
        this.__expRsq = res;
    }
    getHeadersSent() {
        return this.__expRsq.headersSent;
    }
    attachment(filename) {
        this.__expRsq.attachment(filename);
        return this;
    }
    cookie(name, value, options) {
        this.__expRsq.cookie(name, value, options);
        return this;
    }
    clearCookie(name, options) {
        this.__expRsq.clearCookie(name, options);
        return this;
    }
    download(path, filename, complete) {
        this.__expRsq.download(path, filename, complete);
    }
    end(data, encoding) {
        this.__expRsq.end(data, encoding);
        return this;
    }
    format(obj) {
        this.__expRsq.format(obj);
        return this;
    }
    getHeader(field) {
        return this.__expRsq.get(field);
    }
    links(links) {
        this.__expRsq.links(links);
        return this;
    }
    location(path) {
        this.__expRsq.location(path);
        return this;
    }
    redirect(path) {
        this.__expRsq.redirect(path);
        return this;
    }
    send(body) {
        this.__expRsq.send(body);
        return this;
    }
    sendFile(path, options, complete) {
        this.__expRsq.sendFile(path, options, complete);
        return this;
    }
    sendStatus(statusCode) {
        this.__expRsq.sendStatus(statusCode);
        return this;
    }
    setHeader(field, value) {
        this.__expRsq.set(field, value);
        return this;
    }
    status(statusCode) {
        this.__expRsq.status(statusCode);
        return this;
    }
    type(type) {
        this.__expRsq.type(type);
        return this;
    }
    vary(field) {
        this.__expRsq.vary(field);
        return this;
    }
    getLocalProperties() {
        return this.__expRsq.locals.properties;
    }
}
exports.GlassCatHttpResponse = GlassCatHttpResponse;
