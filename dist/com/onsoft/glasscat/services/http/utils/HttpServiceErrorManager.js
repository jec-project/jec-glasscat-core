"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_exchange_1 = require("jec-exchange");
const jec_commons_1 = require("jec-commons");
const LoggerManager_1 = require("../../../util/logging/LoggerManager");
const LocaleManager_1 = require("../../../i18n/LocaleManager");
const ErrorStatusBuilder_1 = require("../../../templates/status/ErrorStatusBuilder");
const ForbiddenStatusBuilder_1 = require("../../../templates/status/ForbiddenStatusBuilder");
class HttpServiceErrorManager {
    constructor() { }
    processNestedResourceError(properties, error, httpRequest, httpResponse, errorTemplatePath) {
        properties.transactionFails = true;
        LoggerManager_1.LoggerManager.getInstance().error(LocaleManager_1.LocaleManager.getInstance().get("errors.nestedResource", error.message));
        ErrorStatusBuilder_1.ErrorStatusBuilder.getInstance().build(httpRequest, httpResponse, errorTemplatePath, jec_commons_1.HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
    processDomainRequestError(properties, error, httpRequest, httpResponse, errorTemplatePath) {
        properties.transactionFails = true;
        let statusCode = error.statusCode;
        if (statusCode === jec_commons_1.HttpStatusCode.INTERNAL_SERVER_ERROR) {
            LoggerManager_1.LoggerManager.getInstance().error(LocaleManager_1.LocaleManager.getInstance().get("errors.session.storageAccessError", error.message));
        }
        ErrorStatusBuilder_1.ErrorStatusBuilder.getInstance().build(httpRequest, httpResponse, errorTemplatePath, statusCode, error.detailsCode);
    }
    processSessionError(properties, error, httpRequest, httpResponse, errorTemplatePath) {
        properties.transactionFails = true;
        let errorType = error.getErrorType();
        switch (errorType) {
            case jec_exchange_1.SessionErrorType.SESSION_EXPIRED:
                httpResponse.status(jec_commons_1.HttpStatusCode.UNAUTHORIZED);
                if (properties.redirectUrl) {
                    httpResponse.redirect(properties.redirectUrl);
                }
                else {
                    ForbiddenStatusBuilder_1.ForbiddenStatusBuilder.getInstance().build(httpRequest, httpResponse, errorTemplatePath, errorType);
                }
                break;
            case jec_exchange_1.SessionErrorType.SESSION_PERSISTENCE_FAILED:
                LoggerManager_1.LoggerManager.getInstance().error(LocaleManager_1.LocaleManager.getInstance().get(errorType, error.toString()));
                ErrorStatusBuilder_1.ErrorStatusBuilder.getInstance().build(httpRequest, httpResponse, errorTemplatePath, jec_commons_1.HttpStatusCode.INTERNAL_SERVER_ERROR, errorType);
        }
    }
    processAuthenticationError(properties, error, httpRequest, httpResponse, errorTemplatePath) {
        properties.transactionFails = true;
        if (error.getStatusCode() === jec_commons_1.HttpStatusCode.NOT_FOUND) {
            ErrorStatusBuilder_1.ErrorStatusBuilder.getInstance().build(httpRequest, httpResponse, errorTemplatePath);
        }
        else {
            ForbiddenStatusBuilder_1.ForbiddenStatusBuilder.getInstance().build(httpRequest, httpResponse, errorTemplatePath);
        }
    }
}
exports.HttpServiceErrorManager = HttpServiceErrorManager;
