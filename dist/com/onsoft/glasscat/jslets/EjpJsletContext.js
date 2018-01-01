"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GlassCatLocaleManager_1 = require("../i18n/GlassCatLocaleManager");
const LoggerManager_1 = require("../util/logging/LoggerManager");
const UrlPatternUtils_1 = require("../util/url/UrlPatternUtils");
const UrlPatternBuilder_1 = require("../util/url/UrlPatternBuilder");
const ContextRootUtil_1 = require("../util/contextroot/ContextRootUtil");
const AbstractContainerContext_1 = require("../context/core/AbstractContainerContext");
const jec_commons_1 = require("jec-commons");
class EjpJsletContext extends AbstractContainerContext_1.AbstractContainerContext {
    constructor(connector, securityContext, sessionContext, loginStrategy) {
        super(connector);
        this._jsletMap = null;
        this._urlPatternUtils = null;
        this._urlPatternBuilder = null;
        this._urlPatternColl = null;
        this._securityContext = null;
        this._sessionContext = null;
        this._loginStrategy = null;
        this.init(securityContext, sessionContext, loginStrategy);
    }
    init(securityContext, sessionContext, loginStrategy) {
        this._securityContext = securityContext;
        this._sessionContext = sessionContext;
        this._jsletMap = new Map();
        this._urlPatternUtils = new UrlPatternUtils_1.UrlPatternUtils();
        this._urlPatternBuilder = new UrlPatternBuilder_1.UrlPatternBuilder();
        this._urlPatternColl = new Array();
        this._loginStrategy = loginStrategy;
    }
    addJslet(jslet) {
        let httpJslet = jslet;
        httpJslet.setContext(this);
        let urlPattern = null;
        let patterns = httpJslet.getUrlPatterns();
        let len = patterns.length;
        let pattern = null;
        while (len--) {
            pattern = patterns[len];
            urlPattern = this._urlPatternBuilder.build(pattern);
            this._urlPatternColl.push(urlPattern);
            this._jsletMap.set(urlPattern.baseUrl, jslet);
        }
        jslet.init();
        let i18n = GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance();
        var msg = i18n.get("jslet.added", httpJslet.getName(), patterns.toString(), httpJslet.getTemplate());
        LoggerManager_1.LoggerManager.getInstance().info(msg);
    }
    getJslet(url) {
        let jslet = undefined;
        let len = this._urlPatternColl.length;
        let urlPattern = null;
        let baseUrl = url === jec_commons_1.UrlStringsEnum.EMPTY_STRING ? ContextRootUtil_1.ContextRootUtil.INDEX : url;
        while (len--) {
            urlPattern = this._urlPatternColl[len];
            if (this._urlPatternUtils.match(baseUrl, urlPattern)) {
                jslet = this._jsletMap.get(urlPattern.baseUrl);
                break;
            }
        }
        return jslet;
    }
    getSecurityContext() {
        return this._securityContext;
    }
    getSessionContext() {
        return this._sessionContext;
    }
    authenticate(req, res, result) {
        this._loginStrategy.authenticate(req, res, result);
    }
    invalidateSession(req, res, result) {
        this._loginStrategy.invalidateSession(req, res, result);
    }
}
exports.EjpJsletContext = EjpJsletContext;
