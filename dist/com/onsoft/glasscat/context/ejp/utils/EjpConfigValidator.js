"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggerManager_1 = require("../../../util/logging/LoggerManager");
const DomainState_1 = require("../../../domains/containers/DomainState");
const jec_exchange_1 = require("jec-exchange");
const jec_commons_1 = require("jec-commons");
const GlassCatError_1 = require("../../../exceptions/GlassCatError");
const GlassCatErrorCode_1 = require("../../../exceptions/GlassCatErrorCode");
class EjpConfigValidator {
    constructor() { }
    printLog(message, logLevel) {
        const logger = LoggerManager_1.LoggerManager.getInstance();
        if (logger.isInitialized()) {
            switch (logLevel) {
                case jec_commons_1.LogLevel.INFO:
                    logger.info(message);
                    break;
                case jec_commons_1.LogLevel.WARN:
                    logger.warn(message);
                    break;
            }
        }
    }
    buildErrorObj(errorCode, message) {
        const errObj = {
            message: message,
            errorCode: errorCode
        };
        return errObj;
    }
    doValidation(config) {
        let prop = null;
        let stringVal = null;
        if (!config) {
            return this.buildErrorObj(GlassCatErrorCode_1.GlassCatErrorCode.NULL_EJP_CONFIG, "EJP configuration cannot be null");
        }
        else if (!config.webapp) {
            return this.buildErrorObj(GlassCatErrorCode_1.GlassCatErrorCode.EJP_CONFIG_MISSING_PROPERTY, "EJP configuration missing property: 'webapp'");
        }
        else {
            prop = config.webapp;
            if (!prop.name) {
                return this.buildErrorObj(GlassCatErrorCode_1.GlassCatErrorCode.EJP_CONFIG_MISSING_PROPERTY, "EJP configuration missing property: 'webapp.name'");
            }
            else if (!prop.welcomeFile) {
                return this.buildErrorObj(GlassCatErrorCode_1.GlassCatErrorCode.EJP_CONFIG_MISSING_PROPERTY, "EJP configuration missing property: 'webapp.welcomeFile'");
            }
            else if (prop.contextRoot === null || prop.contextRoot === undefined) {
                return this.buildErrorObj(GlassCatErrorCode_1.GlassCatErrorCode.EJP_CONFIG_MISSING_PROPERTY, "EJP configuration missing property: 'webapp.contextRoot'");
            }
            else if (prop.contextRoot === jec_commons_1.UrlStringsEnum.EMPTY_STRING) {
                return this.buildErrorObj(GlassCatErrorCode_1.GlassCatErrorCode.EJP_CONFIG_INVALID_PROPERTY, "EJP configuration invalid property: 'webapp.contextRoot' must not be empty");
            }
            stringVal = prop.state;
            if (stringVal) {
                if (stringVal !== DomainState_1.DomainState.STATEFUL &&
                    stringVal !== DomainState_1.DomainState.STATELESS) {
                    return this.buildErrorObj(GlassCatErrorCode_1.GlassCatErrorCode.EJP_CONFIG_INVALID_PROPERTY, "EJP configuration invalid property: 'webapp.state' must be a constant of the DomainState class");
                }
            }
            prop = config.webapp.login;
            if (prop) {
                stringVal = prop.authMethod;
                if (stringVal) {
                    if (stringVal !== jec_exchange_1.AuthMethod.BASIC &&
                        stringVal !== jec_exchange_1.AuthMethod.DIGEST &&
                        stringVal !== jec_exchange_1.AuthMethod.EJP_FORM &&
                        stringVal !== jec_exchange_1.AuthMethod.FORM &&
                        stringVal !== jec_exchange_1.AuthMethod.NONE) {
                        return this.buildErrorObj(GlassCatErrorCode_1.GlassCatErrorCode.EJP_CONFIG_INVALID_PROPERTY, "EJP configuration invalid property: 'webapp.login.authMethod' must be a constant of the AuthMethod class");
                    }
                    else if ((stringVal === jec_exchange_1.AuthMethod.EJP_FORM ||
                        stringVal === jec_exchange_1.AuthMethod.FORM) &&
                        !prop.formConfig) {
                        return this.buildErrorObj(GlassCatErrorCode_1.GlassCatErrorCode.EJP_CONFIG_INVALID_LOGIN, "EJP invalid login configuration: 'webapp.login.formConfig' must not be null when 'webapp.login.authMethod' is AuthMethod.EJP_FORM or AuthMethod.FORM");
                    }
                    if (stringVal !== jec_exchange_1.AuthMethod.NONE) {
                        prop = prop.realm;
                        if (!prop) {
                            return this.buildErrorObj(GlassCatErrorCode_1.GlassCatErrorCode.EJP_CONFIG_INVALID_PROPERTY, "EJP configuration missing property: 'webapp.login.realm'");
                        }
                        else {
                            stringVal = prop.type;
                            if (stringVal !== jec_exchange_1.RealmType.ADMIN_FILE &&
                                stringVal !== jec_exchange_1.RealmType.CUSTOM &&
                                stringVal !== jec_exchange_1.RealmType.DB &&
                                stringVal !== jec_exchange_1.RealmType.FILE &&
                                stringVal !== jec_exchange_1.RealmType.LDAP) {
                                return this.buildErrorObj(GlassCatErrorCode_1.GlassCatErrorCode.EJP_CONFIG_INVALID_PROPERTY, "EJP configuration invalid property: 'webapp.login.realm.type' must be a constant of the RealmType class");
                            }
                            else if (stringVal === jec_exchange_1.RealmType.CUSTOM &&
                                !prop.connectorFactory) {
                                return this.buildErrorObj(GlassCatErrorCode_1.GlassCatErrorCode.EJP_CONFIG_INVALID_REALM, "EJP invalid realm configuration: 'webapp.login.realm.connectorFactory' must not be null when 'webapp.login.realm.type' is RealmType.CUSTOM");
                            }
                        }
                    }
                }
                else {
                    this.printLog("EJP 'webapp.login.authMethod' configuration property is null", jec_commons_1.LogLevel.WARN);
                }
                prop = config.webapp.session;
                if (prop) {
                    stringVal = prop.storage;
                    if (stringVal) {
                        if (stringVal !== jec_exchange_1.SessionStorageType.LOCAL &&
                            stringVal !== jec_exchange_1.SessionStorageType.DISTANT) {
                            return this.buildErrorObj(GlassCatErrorCode_1.GlassCatErrorCode.EJP_CONFIG_INVALID_PROPERTY, "EJP configuration invalid property: 'webapp.session.storage' must be a constant of the SessionStorageType class");
                        }
                    }
                }
            }
        }
        return null;
    }
    validate(config, result) {
        this.printLog("EJP configuration validation start", jec_commons_1.LogLevel.INFO);
        let glassCatErr = null;
        const err = this.doValidation(config);
        if (!err) {
            this.printLog("EJP configuration validation complete", jec_commons_1.LogLevel.INFO);
        }
        else {
            glassCatErr = new GlassCatError_1.GlassCatError(err.errorCode, err.message);
        }
        result(glassCatErr);
    }
}
exports.EjpConfigValidator = EjpConfigValidator;
;
