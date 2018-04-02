"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const KernelBuilder_1 = require("../util/core/KernelBuilder");
const LoggerManager_1 = require("../util/logging/LoggerManager");
const LoggerManagerBuilder_1 = require("../util/logging/LoggerManagerBuilder");
const GlassCatLocaleManager_1 = require("../i18n/GlassCatLocaleManager");
const ContextValidator_1 = require("../context/validators/ContextValidator");
const EnvironmentValidator_1 = require("../context/validators/EnvironmentValidator");
class GlassCat {
    constructor(config) {
        this._kernel = null;
        this._config = null;
        this.initObj(config);
    }
    initObj(config) {
        this._config = config;
    }
    runProcesses() {
        const initDate = Date.now();
        this.initKernel();
        this.initLogger();
        this.checkConfig();
        this.initServices();
        this.startServices();
        LoggerManager_1.LoggerManager.getInstance().info(GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance().get("server.ready"));
        LoggerManager_1.LoggerManager.getInstance().info(GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance().get("server.startDuration", String(Date.now() - initDate)));
    }
    killProcesses() {
        this._kernel.stopServices();
        this._kernel = null;
        LoggerManager_1.LoggerManager.getInstance().info(GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance().get("server.stop"));
    }
    initKernel() {
        const builder = new KernelBuilder_1.KernelBuilder();
        this._kernel = builder.build(this._config);
    }
    initLogger() {
        new LoggerManagerBuilder_1.LoggerManagerBuilder().context(this._kernel.getContext()).build();
    }
    checkConfig() {
        new ContextValidator_1.ContextValidator().validate(this._kernel);
        new EnvironmentValidator_1.EnvironmentValidator().validate(this._kernel);
        LoggerManager_1.LoggerManager.getInstance().info(GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance().get("singleton.info", "[JcadContextManager]", jec_commons_1.JcadContextManager.getInstance().getId()));
        LoggerManager_1.LoggerManager.getInstance().info(GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance().get("singleton.info", "[DecoratorConnectorManager]", jec_commons_1.DecoratorConnectorManager.getInstance().getId()));
    }
    initServices() {
        this._kernel.initServices();
    }
    startServices() {
        this._kernel.startServices();
    }
    start() {
        this.runProcesses();
    }
    stop() {
        this.killProcesses();
    }
}
exports.GlassCat = GlassCat;
;
