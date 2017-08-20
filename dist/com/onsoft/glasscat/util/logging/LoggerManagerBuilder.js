"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggerManager_1 = require("./LoggerManager");
const GlassCatError_1 = require("../../exceptions/GlassCatError");
const GlassCatErrorCode_1 = require("../../exceptions/GlassCatErrorCode");
class LoggerManagerBuilder {
    constructor() {
        this._ctx = null;
    }
    context(value) {
        this._ctx = value;
        return this;
    }
    build() {
        if (!this._ctx) {
            throw new GlassCatError_1.GlassCatError(GlassCatErrorCode_1.GlassCatErrorCode.INVALID_CONTEXT, "GlassCatContext must not be null");
        }
        let loggerContexts = this._ctx.getLoggerContexts();
        let loggers = new Array();
        let len = loggerContexts.length;
        let loggerContext = null;
        while (len--) {
            loggerContext = loggerContexts[len];
            loggers.push(loggerContext.factory.build(loggerContext));
        }
        let logLevel = this._ctx.getLogLevel();
        let manager = LoggerManager_1.LoggerManager.getInstance();
        manager.init(loggers, logLevel);
        return manager;
    }
}
exports.LoggerManagerBuilder = LoggerManagerBuilder;
;
