"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EjpJsletContext_1 = require("../EjpJsletContext");
const jec_commons_1 = require("jec-commons");
const GlassCatLocaleManager_1 = require("../../i18n/GlassCatLocaleManager");
const LoggerManager_1 = require("../../util/logging/LoggerManager");
const GlassCatError_1 = require("../../exceptions/GlassCatError");
const GlassCatErrorCode_1 = require("../../exceptions/GlassCatErrorCode");
const jec_sokoke_1 = require("jec-sokoke");
const jec_jdi_1 = require("jec-jdi");
class JsletContextBuilder {
    constructor() {
        if (JsletContextBuilder._locked || JsletContextBuilder.INSTANCE) {
            const msg = GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance().get("errors.singleton", "JsletContextBuilder");
            throw new GlassCatError_1.GlassCatError(GlassCatErrorCode_1.GlassCatErrorCode.SINGLETON_ERROR, msg);
        }
        JsletContextBuilder._locked = true;
    }
    static getInstance() {
        if (JsletContextBuilder.INSTANCE === null) {
            JsletContextBuilder._locked = false;
            JsletContextBuilder.INSTANCE = new JsletContextBuilder();
        }
        return JsletContextBuilder.INSTANCE;
    }
    performDI(jslet) {
        const sokoke = jec_sokoke_1.Sokoke.getInstance();
        const injectionPoints = jslet[jec_sokoke_1.SokokeMetadataRefs.SOKOKE_INJECTION_POINT_METADATA];
        let len = -1;
        let injectionPoint = null;
        let value = null;
        let bean = null;
        let scopeType = null;
        let scope = null;
        if (injectionPoints) {
            len = injectionPoints.length;
            while (len--) {
                injectionPoint = injectionPoints[len];
                bean = injectionPoint.getBean();
                if (bean) {
                    scope = bean.getScope();
                    scopeType = scope ? scope.getType() : jec_jdi_1.ScopeType.DEPENDENT;
                    if (scopeType === jec_jdi_1.ScopeType.APPLICATION ||
                        scopeType === jec_jdi_1.ScopeType.DEPENDENT) {
                        value = sokoke.getInjectableReference(bean);
                        Reflect.defineProperty(jslet, injectionPoint.getElement().getName(), { value: value });
                    }
                }
            }
        }
    }
    buildJslet(path, target) {
        const filePath = jec_commons_1.PathUtils.getInstance().buildFilePath(target, path);
        let jslet = null;
        let Contructor = null;
        try {
            Contructor = jec_commons_1.GlobalClassLoader.getInstance().loadClass(filePath);
            jslet = new Contructor();
            this.performDI(jslet);
        }
        catch (e) {
            throw new GlassCatError_1.GlassCatError(GlassCatErrorCode_1.GlassCatErrorCode.INVALID_JSLET_CONFIG, e);
        }
        return jslet;
    }
    buildContext(connector, securityContext, sessionContext, loginStrategy) {
        const context = new EjpJsletContext_1.EjpJsletContext(connector, securityContext, sessionContext, loginStrategy);
        const i18n = GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance();
        const msg = i18n.get("jslet.newContext", connector.getContextRoot());
        LoggerManager_1.LoggerManager.getInstance().debug(msg);
        return context;
    }
    initJslets(context, jslets) {
        const target = context.getSourcePath();
        let len = -1;
        let jslet = null;
        let path = null;
        if (jslets) {
            len = jslets.length;
            while (len--) {
                path = jslets[len];
                jslet = this.buildJslet(path, target);
                context.addJslet(jslet);
            }
        }
    }
}
JsletContextBuilder._locked = true;
JsletContextBuilder.INSTANCE = null;
exports.JsletContextBuilder = JsletContextBuilder;
