"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
class HttpTransaction {
    constructor(url) {
        this._id = null;
        this._url = null;
        this._initialTimestamp = 0;
        this._finalTimestamp = 0;
        this._closed = false;
        this._success = true;
        this.init(url);
    }
    init(url) {
        let generator = new jec_commons_1.GuidGenerator();
        this._initialTimestamp = Date.now();
        this._id = generator.generate();
        this._url = url;
    }
    getInitialTimestamp() {
        return this._initialTimestamp;
    }
    getFinalTimestamp() {
        return this._finalTimestamp;
    }
    getUrl() {
        return this._url;
    }
    getId() {
        return this._id;
    }
    isClosed() {
        return this._closed;
    }
    getSuccess() {
        return this._success;
    }
    close(success) {
        this._finalTimestamp = Date.now();
        this._closed = true;
        this._success = success;
    }
    toString() {
        let s = "[Object::HttpTransaction: guid=" + this._id +
            ", url=" + this._url + ", initialTimestamp=" + this._initialTimestamp +
            ", finalTimestamp=" + this._finalTimestamp + ", closed=" + this._closed +
            ", success=" + this._success + "]";
        return s;
    }
}
exports.HttpTransaction = HttpTransaction;
