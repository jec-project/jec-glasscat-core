"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ejs = require("ejs");
const LoggerManager_1 = require("../../util/logging/LoggerManager");
const GlassCatLocaleManager_1 = require("../../i18n/GlassCatLocaleManager");
const GlassCatError_1 = require("../../exceptions/GlassCatError");
const GlassCatErrorCode_1 = require("../../exceptions/GlassCatErrorCode");
class ErrorTemplateProcessor {
    constructor() {
        if (ErrorTemplateProcessor._locked || ErrorTemplateProcessor.INSTANCE) {
            const msg = GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance().get("errors.singleton", "ErrorTemplateProcessor");
            throw new GlassCatError_1.GlassCatError(GlassCatErrorCode_1.GlassCatErrorCode.SINGLETON_ERROR, msg);
        }
        ErrorTemplateProcessor._locked = true;
    }
    static getInstance() {
        if (ErrorTemplateProcessor.INSTANCE === null) {
            ErrorTemplateProcessor._locked = false;
            ErrorTemplateProcessor.INSTANCE = new ErrorTemplateProcessor();
        }
        return ErrorTemplateProcessor.INSTANCE;
    }
    renderFile(templatePath, data, req, res) {
        res.status(data.status);
        ejs.renderFile(templatePath, data, null, function (error, result) {
            if (!error) {
                res.end(result);
            }
            else {
                const logger = LoggerManager_1.LoggerManager.getInstance();
                if (logger.isInitialized()) {
                    LoggerManager_1.LoggerManager.getInstance().error(error);
                }
                res.end(null);
            }
        });
    }
}
ErrorTemplateProcessor._locked = true;
ErrorTemplateProcessor.INSTANCE = null;
exports.ErrorTemplateProcessor = ErrorTemplateProcessor;
