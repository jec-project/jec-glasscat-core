"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const LocaleManager_1 = require("../../../i18n/LocaleManager");
const fs = require("fs");
const GlassCatError_1 = require("../../../exceptions/GlassCatError");
const GlassCatErrorCode_1 = require("../../../exceptions/GlassCatErrorCode");
class ResourceProxy {
    constructor() {
        if (ResourceProxy._locked || ResourceProxy.INSTANCE) {
            let msg = LocaleManager_1.LocaleManager.getInstance().get("errors.singleton", "ResourceProxy");
            throw new GlassCatError_1.GlassCatError(GlassCatErrorCode_1.GlassCatErrorCode.SINGLETON_ERROR, msg);
        }
        ResourceProxy._locked = true;
    }
    static getInstance() {
        if (ResourceProxy.INSTANCE === null) {
            ResourceProxy._locked = false;
            ResourceProxy.INSTANCE = new ResourceProxy();
        }
        return ResourceProxy.INSTANCE;
    }
    getConectorRef(listener, contextRoot) {
        let connectorRef = listener.getProtocol() + listener.getDomain() +
            jec_commons_1.UrlStringsEnum.COLON + listener.getPort() +
            contextRoot;
        return connectorRef;
    }
    testUrl(url) {
        return ResourceProxy.RESOURCE_PROXY_PATTERN.test(url);
    }
    getProxyPath(baseUrl, listener, domainConnectorManager) {
        let found = baseUrl.match(ResourceProxy.RESOURCE_PROXY_PATTERN);
        let pathMap = found[0];
        let pathLength = pathMap.length;
        let lastColonId = pathMap.lastIndexOf(jec_commons_1.UrlStringsEnum.COLON);
        let contextRoot = pathMap.substring(pathMap.indexOf(jec_commons_1.UrlStringsEnum.COLON) + 1, lastColonId);
        let connector = domainConnectorManager.getDomainConnector(this.getConectorRef(listener, contextRoot));
        let resourceRef = pathMap.substring(lastColonId + 1, pathLength - 1);
        let resourceValue = connector.getContainer().getMappedResource(resourceRef);
        let path = connector.getTarget() + jec_commons_1.JecStringsEnum.WEB_APP +
            resourceValue + jec_commons_1.UrlStringsEnum.SLASH +
            baseUrl.substr(found[ResourceProxy.INDEX] + pathLength);
        return path;
    }
    loadFile(path, callback) {
        fs.readFile(path, callback);
    }
}
ResourceProxy._locked = true;
ResourceProxy.INSTANCE = null;
ResourceProxy.RESOURCE_PROXY_SIZE = 10;
ResourceProxy.INDEX = "index";
ResourceProxy.RESOURCE_PROXY_PATTERN = /\[resource:.*\]/;
exports.ResourceProxy = ResourceProxy;
