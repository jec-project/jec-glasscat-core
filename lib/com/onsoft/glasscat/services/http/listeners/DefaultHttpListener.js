"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const HttpMonitoring_1 = require("./HttpMonitoring");
class DefaultHttpListener {
    constructor(config) {
        this._id = null;
        this._port = 0;
        this._address = null;
        this._isSecured = false;
        this._server = null;
        this._protocol = null;
        this._domain = null;
        this._securityConfig = null;
        this._enableMonitoring = false;
        this._transactionMonitor = null;
        this.init(config);
    }
    init(config) {
        let monitoring = new HttpMonitoring_1.HttpMonitoring(config.monitoring);
        this._id = config.id;
        this._port = config.port;
        this._address = config.address;
        this._isSecured = config.secured;
        this._server = config.server;
        this._protocol =
            this._isSecured ? jec_commons_1.HttpConnectionType.HTTPS : jec_commons_1.HttpConnectionType.HTTP;
        this._securityConfig = config.securityConfig;
        this._domain = config.domain;
        this._enableMonitoring = monitoring.enableMonitoring();
        this._transactionMonitor = monitoring.getTransactionMonitor();
    }
    getId() {
        return this._id;
    }
    getPort() {
        return this._port;
    }
    getAdress() {
        return this._address;
    }
    getSecured() {
        return this._isSecured;
    }
    getServer() {
        return this._server;
    }
    getProtocol() {
        return this._protocol;
    }
    getDomain() {
        return this._domain;
    }
    getSecurityConfig() {
        return this._securityConfig;
    }
    enableMonitoring() {
        return this._enableMonitoring;
    }
    getTransactionMonitor() {
        return this._transactionMonitor;
    }
}
exports.DefaultHttpListener = DefaultHttpListener;
;
