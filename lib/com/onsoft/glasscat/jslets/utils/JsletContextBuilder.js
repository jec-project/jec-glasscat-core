"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EjpJsletContext_1 = require("../EjpJsletContext");
const jec_commons_1 = require("jec-commons");
const LocaleManager_1 = require("../../i18n/LocaleManager");
const LoggerManager_1 = require("../../util/logging/LoggerManager");
const GlassCatError_1 = require("../../exceptions/GlassCatError");
const GlassCatErrorCode_1 = require("../../exceptions/GlassCatErrorCode");
class JsletContextBuilder {
    constructor() {
        if (JsletContextBuilder._locked || JsletContextBuilder.INSTANCE) {
            let msg = LocaleManager_1.LocaleManager.getInstance().get("errors.singleton", "HttpStatusReportBuilder");
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
    buildJslet(path, target) {
        let loader = new jec_commons_1.ClassLoader();
        let jslet = null;
        let Contructor = null;
        try {
            Contructor = loader.loadClass(target + path);
            jslet = new Contructor();
        }
        catch (e) {
            throw new GlassCatError_1.GlassCatError(GlassCatErrorCode_1.GlassCatErrorCode.INVALID_JSLET_CONFIG);
        }
        return jslet;
    }
    buildContext(connector, securityContext, sessionContext, loginStrategy) {
        let context = new EjpJsletContext_1.EjpJsletContext(connector, securityContext, sessionContext, loginStrategy);
        let i18n = LocaleManager_1.LocaleManager.getInstance();
        var msg = i18n.get("jslet.newContext", connector.getContextRoot());
        LoggerManager_1.LoggerManager.getInstance().info(msg);
        return context;
    }
    initJslets(context, jslets) {
        let len = -1;
        let jslet = null;
        let path = null;
        let target = context.getSourcePath();
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
