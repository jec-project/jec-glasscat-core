"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggerManager_1 = require("../../util/logging/LoggerManager");
const LocaleManager_1 = require("../../i18n/LocaleManager");
class ContextValidator {
    constructor() { }
    validate(kernel) {
        let i18n = LocaleManager_1.LocaleManager.getInstance();
        LoggerManager_1.LoggerManager.getInstance().info(i18n.get("context.start"));
        let isValid = true;
        let context = kernel.getContext();
        let ctxVer = context.getVersion();
        let kerVer = kernel.getVersion();
        if (ctxVer !== kerVer) {
            LoggerManager_1.LoggerManager.getInstance().warn(i18n.get("warnings.invalidContext", ctxVer, kerVer));
            isValid = false;
        }
        if (!isValid) {
            LoggerManager_1.LoggerManager.getInstance().warn(i18n.get("context.invalid"));
        }
        else
            LoggerManager_1.LoggerManager.getInstance().info(i18n.get("context.valid"));
    }
}
exports.ContextValidator = ContextValidator;
;
