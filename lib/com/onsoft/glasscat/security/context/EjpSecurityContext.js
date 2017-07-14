"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggerManager_1 = require("../../util/logging/LoggerManager");
const LocaleManager_1 = require("../../i18n/LocaleManager");
const UrlPatternUtils_1 = require("../../util/url/UrlPatternUtils");
const ContextRootUtil_1 = require("../../util/contextroot/ContextRootUtil");
const jec_commons_1 = require("jec-commons");
class EjpSecurityContext {
    constructor(contextRoot) {
        this._contextRoot = null;
        this._securityRoleMap = null;
        this._constraintsMap = null;
        this._staticResourcesMap = null;
        this._urlPatternUtils = null;
        this._urlPatternColl = null;
        this.init(contextRoot);
    }
    init(contextRoot) {
        this._contextRoot = contextRoot;
        this._securityRoleMap = new Map();
        this._constraintsMap = new Map();
        this._staticResourcesMap = new Map();
        this._urlPatternUtils = new UrlPatternUtils_1.UrlPatternUtils();
        this._urlPatternColl = new Array();
    }
    addSecurityRole(role) {
        let name = role.getName();
        this._securityRoleMap.set(name, role);
        let msg = LocaleManager_1.LocaleManager.getInstance().get("security.roles.added", name);
        LoggerManager_1.LoggerManager.getInstance().info(msg);
    }
    getSecurityRole(name) {
        return this._securityRoleMap.get(name);
    }
    addSecurityConstraint(constraint) {
        let name = constraint.getName();
        let urlPattern = constraint.getUrlPattern();
        let url = urlPattern.baseUrl;
        this._constraintsMap.set(url, constraint);
        this._urlPatternColl.push(urlPattern);
        let msg = LocaleManager_1.LocaleManager.getInstance()
            .get("security.constraint.added", this._contextRoot, name);
        LoggerManager_1.LoggerManager.getInstance().info(msg);
    }
    getSecurityConstraint(url) {
        let constraint = undefined;
        let len = this._urlPatternColl.length;
        let urlPattern = null;
        let baseUrl = url === jec_commons_1.UrlStringsEnum.EMPTY_STRING ? ContextRootUtil_1.ContextRootUtil.INDEX : url;
        while (len--) {
            urlPattern = this._urlPatternColl[len];
            if (this._urlPatternUtils.match(baseUrl, urlPattern)) {
                constraint = this._constraintsMap.get(urlPattern.baseUrl);
                break;
            }
        }
        return constraint;
    }
    addStaticResources(resources) {
        let urlPattern = resources.getUrlPattern();
        let url = urlPattern.baseUrl;
        this._staticResourcesMap.set(url, resources);
        this._urlPatternColl.push(urlPattern);
    }
    getStaticResources(url) {
        let resources = undefined;
        let len = this._urlPatternColl.length;
        let urlPattern = null;
        let baseUrl = url === jec_commons_1.UrlStringsEnum.EMPTY_STRING ? ContextRootUtil_1.ContextRootUtil.INDEX : url;
        while (len--) {
            urlPattern = this._urlPatternColl[len];
            if (this._urlPatternUtils.match(baseUrl, urlPattern)) {
                resources = this._staticResourcesMap.get(urlPattern.baseUrl);
                break;
            }
        }
        return resources;
    }
    getContextRoot() {
        return this._contextRoot;
    }
}
exports.EjpSecurityContext = EjpSecurityContext;
;