"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const GlassCatLocaleManager_1 = require("../../i18n/GlassCatLocaleManager");
const GlassCatError_1 = require("../../exceptions/GlassCatError");
const GlassCatErrorCode_1 = require("../../exceptions/GlassCatErrorCode");
class LoggerManager extends jec_commons_1.AbstractLogger {
    constructor() {
        super();
        this._initialized = false;
        this._loggers = null;
        if (LoggerManager._locked || LoggerManager.INSTANCE) {
            let msg = GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance().get("errors.singleton", "LoggerManager");
            throw new GlassCatError_1.GlassCatError(GlassCatErrorCode_1.GlassCatErrorCode.SINGLETON_ERROR, msg);
        }
        LoggerManager._locked = true;
    }
    static getInstance() {
        if (LoggerManager.INSTANCE === null) {
            LoggerManager._locked = false;
            LoggerManager.INSTANCE = new LoggerManager();
        }
        return LoggerManager.INSTANCE;
    }
    init(loggers, logLevel) {
        let i18n = GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance();
        let llu = null;
        let msg = null;
        let loggerNum = 1;
        let logger = null;
        let len = 0;
        if (loggers) {
            this.__name = "LoggerManager";
            this.__logLevel = logLevel;
            this._loggers = loggers;
            llu = new jec_commons_1.LogLevelUtil();
            msg = i18n.get("loggers.init", llu.logLevelToString(logLevel));
            this.info(msg);
            if (this.__logLevel <= jec_commons_1.LogLevel.DEBUG) {
                len = this._loggers.length;
                while (len--) {
                    logger = this._loggers[len];
                    msg += "\n   => " + i18n.get("loggers.num", String(loggerNum));
                    msg += "\n   * " + i18n.get("loggers.name", String(logger.getName()));
                    msg += "\n   * " + i18n.get("loggers.classref", String(logger));
                    msg += "\n   * " + i18n.get("loggers.internalLogLevel", String(llu.logLevelToString(logger.getLogLevel())));
                    loggerNum++;
                }
                this.debug(msg);
            }
            this._initialized = true;
        }
        else {
            this.__name = null;
            this.__logLevel = null;
            this._loggers = null;
            this._initialized = false;
        }
    }
    isInitialized() {
        return this._initialized;
    }
    setLogLevel(logLevel) { }
    setName(name) { }
    debug(marker) {
        if (this.__logLevel <= jec_commons_1.LogLevel.DEBUG && this.__logLevel !== jec_commons_1.LogLevel.OFF) {
            let len = this._loggers.length;
            while (len--)
                this._loggers[len].debug(marker);
        }
    }
    error(marker) {
        if (this.__logLevel <= jec_commons_1.LogLevel.ERROR && this.__logLevel !== jec_commons_1.LogLevel.OFF) {
            let len = this._loggers.length;
            while (len--)
                this._loggers[len].error(marker);
        }
    }
    info(marker) {
        if (this.__logLevel <= jec_commons_1.LogLevel.INFO && this.__logLevel !== jec_commons_1.LogLevel.OFF) {
            let len = this._loggers.length;
            while (len--)
                this._loggers[len].info(marker);
        }
    }
    trace(marker) {
        if (this.__logLevel <= jec_commons_1.LogLevel.TRACE && this.__logLevel !== jec_commons_1.LogLevel.OFF) {
            let len = this._loggers.length;
            while (len--)
                this._loggers[len].trace(marker);
        }
    }
    warn(marker) {
        if (this.__logLevel <= jec_commons_1.LogLevel.WARN && this.__logLevel !== jec_commons_1.LogLevel.OFF) {
            let len = this._loggers.length;
            while (len--)
                this._loggers[len].warn(marker);
        }
    }
}
LoggerManager._locked = true;
LoggerManager.INSTANCE = null;
exports.LoggerManager = LoggerManager;
;
