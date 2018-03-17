"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EjpBootstrapContext_1 = require("../EjpBootstrapContext");
const GlassCatLocaleManager_1 = require("../../i18n/GlassCatLocaleManager");
const LoggerManager_1 = require("../../util/logging/LoggerManager");
const GlassCatError_1 = require("../../exceptions/GlassCatError");
const GlassCatErrorCode_1 = require("../../exceptions/GlassCatErrorCode");
class BootstrapContextBuilder {
    constructor() {
        if (BootstrapContextBuilder._locked || BootstrapContextBuilder.INSTANCE) {
            const msg = GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance().get("errors.singleton", "BootstrapContextBuilder");
            throw new GlassCatError_1.GlassCatError(GlassCatErrorCode_1.GlassCatErrorCode.SINGLETON_ERROR, msg);
        }
        BootstrapContextBuilder._locked = true;
    }
    static getInstance() {
        if (BootstrapContextBuilder.INSTANCE === null) {
            BootstrapContextBuilder._locked = false;
            BootstrapContextBuilder.INSTANCE = new BootstrapContextBuilder();
        }
        return BootstrapContextBuilder.INSTANCE;
    }
    buildContext(connector) {
        const context = new EjpBootstrapContext_1.EjpBootstrapContext(connector);
        const msg = GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance().get("bootstrap.newContext", connector.getContextRoot());
        LoggerManager_1.LoggerManager.getInstance().debug(msg);
        return context;
    }
}
BootstrapContextBuilder._locked = true;
BootstrapContextBuilder.INSTANCE = null;
exports.BootstrapContextBuilder = BootstrapContextBuilder;
