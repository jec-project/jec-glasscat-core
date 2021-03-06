"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ContextRootData_1 = require("./ContextRootData");
const ResourceProxy_1 = require("../../services/http/proxy/ResourceProxy");
const jec_commons_1 = require("jec-commons");
class ContextRootUtil {
    constructor() {
        this._contextRootData = null;
        this.init();
    }
    init() {
        this._contextRootData = new ContextRootData_1.ContextRootData();
    }
    buildContextRoot(connector, listener) {
        const ctx = listener.getProtocol() + connector.getHost() + jec_commons_1.UrlStringsEnum.COLON +
            listener.getPort() + connector.getContextRoot();
        return ctx;
    }
    extractContextRoot(reqest) {
        const host = reqest.header(ContextRootUtil.HOST);
        let path = reqest.path;
        let referer = jec_commons_1.UrlStringsEnum.EMPTY_STRING;
        let index = -1;
        let buffer = null;
        this._contextRootData.reset();
        if (ResourceProxy_1.ResourceProxy.getInstance().testUrl(path)) {
            this._contextRootData.containsNestedResource = true;
        }
        else {
            path = reqest.path.substr(1);
            index = path.indexOf(jec_commons_1.UrlStringsEnum.SLASH);
            if (index !== -1) {
                path = path.substr(0, index);
                referer = reqest.header(ContextRootUtil.REFERER);
                if (referer && referer.indexOf(host) !== -1) {
                    referer = referer.replace(jec_commons_1.UrlStringsEnum.SCHEME_DELIMITER, jec_commons_1.UrlStringsEnum.EMPTY_STRING);
                    buffer = referer.split(jec_commons_1.UrlStringsEnum.SLASH);
                    this._contextRootData.contextRoot = buffer[0] + buffer[1];
                }
                else {
                    this._contextRootData.contextRoot = reqest.protocol + host + path;
                }
            }
            else {
                this._contextRootData.needsRedirection = true;
                this._contextRootData.newPath = path + jec_commons_1.UrlStringsEnum.SLASH;
                this._contextRootData.contextRoot = reqest.protocol + host + path;
            }
        }
        return this._contextRootData;
    }
}
ContextRootUtil.REFERER = "referer";
ContextRootUtil.HOST = "host";
ContextRootUtil.INDEX = "__INDEX__";
exports.ContextRootUtil = ContextRootUtil;
