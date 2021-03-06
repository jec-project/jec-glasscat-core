"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GlassCatLocaleManager_1 = require("../../i18n/GlassCatLocaleManager");
const HttpStatusReportBuilder_1 = require("../../templates/status/HttpStatusReportBuilder");
const ErrorTemplateProcessor_1 = require("../../templates/error/ErrorTemplateProcessor");
const jec_commons_1 = require("jec-commons");
const GlassCatError_1 = require("../../exceptions/GlassCatError");
const GlassCatErrorCode_1 = require("../../exceptions/GlassCatErrorCode");
class ErrorStatusBuilder {
    constructor() {
        if (ErrorStatusBuilder._locked || ErrorStatusBuilder.INSTANCE) {
            const msg = GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance().get("errors.singleton", "ErrorStatusBuilder");
            throw new GlassCatError_1.GlassCatError(GlassCatErrorCode_1.GlassCatErrorCode.SINGLETON_ERROR, msg);
        }
        ErrorStatusBuilder._locked = true;
    }
    static getInstance() {
        if (ErrorStatusBuilder.INSTANCE === null) {
            ErrorStatusBuilder._locked = false;
            ErrorStatusBuilder.INSTANCE = new ErrorStatusBuilder();
        }
        return ErrorStatusBuilder.INSTANCE;
    }
    build(req, res, templatePath, statusCode = jec_commons_1.HttpStatusCode.NOT_FOUND, detailsCode = "httpErrors.error.description") {
        const url = req.getOriginalUrl();
        const i18n = GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance();
        const statusReport = HttpStatusReportBuilder_1.HttpStatusReportBuilder.getInstance().build(statusCode, i18n.get("httpErrors.error.title"), i18n.get("httpErrors.error.message", String(statusCode)), i18n.get(detailsCode, url));
        ErrorTemplateProcessor_1.ErrorTemplateProcessor.getInstance().renderFile(templatePath, statusReport, req, res);
    }
}
ErrorStatusBuilder._locked = true;
ErrorStatusBuilder.INSTANCE = null;
exports.ErrorStatusBuilder = ErrorStatusBuilder;
