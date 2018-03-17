"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GlassCatLocaleManager_1 = require("../../i18n/GlassCatLocaleManager");
const HttpStatusReportBuilder_1 = require("../../templates/status/HttpStatusReportBuilder");
const ErrorTemplateProcessor_1 = require("../../templates/error/ErrorTemplateProcessor");
const jec_commons_1 = require("jec-commons");
const GlassCatError_1 = require("../../exceptions/GlassCatError");
const GlassCatErrorCode_1 = require("../../exceptions/GlassCatErrorCode");
class ForbiddenStatusBuilder {
    constructor() {
        if (ForbiddenStatusBuilder._locked || ForbiddenStatusBuilder.INSTANCE) {
            const msg = GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance().get("errors.singleton", "ForbiddenStatusBuilder");
            throw new GlassCatError_1.GlassCatError(GlassCatErrorCode_1.GlassCatErrorCode.SINGLETON_ERROR, msg);
        }
        ForbiddenStatusBuilder._locked = true;
    }
    static getInstance() {
        if (ForbiddenStatusBuilder.INSTANCE === null) {
            ForbiddenStatusBuilder._locked = false;
            ForbiddenStatusBuilder.INSTANCE = new ForbiddenStatusBuilder();
        }
        return ForbiddenStatusBuilder.INSTANCE;
    }
    build(req, res, templatePath, detailsCode = "httpErrors.forbidden.description") {
        const url = req.getOriginalUrl();
        const i18n = GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance();
        const statusReport = HttpStatusReportBuilder_1.HttpStatusReportBuilder.getInstance().build(jec_commons_1.HttpStatusCode.FORBIDEN, i18n.get("httpErrors.forbidden.title"), i18n.get("httpErrors.forbidden.message"), i18n.get(detailsCode, url));
        ErrorTemplateProcessor_1.ErrorTemplateProcessor.getInstance().renderFile(templatePath, statusReport, req, res);
    }
}
ForbiddenStatusBuilder._locked = true;
ForbiddenStatusBuilder.INSTANCE = null;
exports.ForbiddenStatusBuilder = ForbiddenStatusBuilder;
