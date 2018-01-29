"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GlassCatLocaleManager_1 = require("../i18n/GlassCatLocaleManager");
const LoggerManager_1 = require("../util/logging/LoggerManager");
const AbstractContainerContext_1 = require("../context/core/AbstractContainerContext");
class EjpBootstrapContext extends AbstractContainerContext_1.AbstractContainerContext {
    constructor(connector) {
        super(connector);
        this._scriptList = null;
        this.init();
    }
    init() {
        this._scriptList = new Array();
    }
    addScript(script) {
        let msg = GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance().get("bootstrap.added", script.constructor.name);
        this._scriptList.push(script);
        LoggerManager_1.LoggerManager.getInstance().debug(msg);
    }
    getScriptList() {
        return this._scriptList;
    }
}
exports.EjpBootstrapContext = EjpBootstrapContext;
