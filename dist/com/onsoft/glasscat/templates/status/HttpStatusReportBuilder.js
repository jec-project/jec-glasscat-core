"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatusReport_1 = require("./HttpStatusReport");
const GlassCatLocaleManager_1 = require("../../i18n/GlassCatLocaleManager");
const GlassCatError_1 = require("../../exceptions/GlassCatError");
const GlassCatErrorCode_1 = require("../../exceptions/GlassCatErrorCode");
class HttpStatusReportBuilder {
    constructor() {
        this._version = null;
        this._codeName = null;
        if (HttpStatusReportBuilder._locked || HttpStatusReportBuilder.INSTANCE) {
            const msg = GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance().get("errors.singleton", "HttpStatusReportBuilder");
            throw new GlassCatError_1.GlassCatError(GlassCatErrorCode_1.GlassCatErrorCode.SINGLETON_ERROR, msg);
        }
        HttpStatusReportBuilder._locked = true;
    }
    static getInstance() {
        if (HttpStatusReportBuilder.INSTANCE === null) {
            HttpStatusReportBuilder._locked = false;
            HttpStatusReportBuilder.INSTANCE = new HttpStatusReportBuilder();
        }
        return HttpStatusReportBuilder.INSTANCE;
    }
    init(version, codeName) {
        this._version = version;
        this._codeName = codeName;
    }
    build(status, title, message, description) {
        const report = new HttpStatusReport_1.HttpStatusReport();
        report.status = status;
        report.title = title;
        report.message = message;
        report.description = description;
        report.version = this._version;
        report.codeName = this._codeName;
        return report;
    }
}
HttpStatusReportBuilder._locked = true;
HttpStatusReportBuilder.INSTANCE = null;
exports.HttpStatusReportBuilder = HttpStatusReportBuilder;
