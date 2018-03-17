"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggerManager_1 = require("../../../util/logging/LoggerManager");
const EjpConfigValidator_1 = require("./EjpConfigValidator");
const jec_exchange_1 = require("jec-exchange");
const jec_commons_1 = require("jec-commons");
const GlassCatError_1 = require("../../../exceptions/GlassCatError");
const GlassCatErrorCode_1 = require("../../../exceptions/GlassCatErrorCode");
class EjpConfigSerializer {
    constructor() {
        this._validator = null;
        this.init();
    }
    init() {
        this._validator = new EjpConfigValidator_1.EjpConfigValidator();
    }
    stringify(config, optimize) {
        const webapp = config.webapp;
        let optimized = null;
        let result = null;
        if (optimize) {
            optimized = {};
            this.optimizeWebbAppConfig(optimized, webapp);
            this.optimizeBootstrapConfig(optimized, webapp.bootstrap);
            this.optimizeJsletConfig(optimized, webapp.jslets);
            this.optimizeLoginConfig(optimized, webapp.login);
            this.optimizeSessionConfig(optimized, webapp.session);
            this.optimizeResourceMapConfig(optimized, webapp.resourceMap);
            this.optimizeSecurityConfig(optimized, webapp.security);
            result = JSON.stringify(optimized);
        }
        else {
            result = JSON.stringify(config);
        }
        return result;
    }
    optimizeWebbAppConfig(result, webapp) {
        let val = null;
        let optimizedWebapp = {
            name: webapp.name,
            contextRoot: webapp.contextRoot,
            welcomeFile: webapp.welcomeFile
        };
        val = webapp.description;
        if (val && val !== jec_commons_1.UrlStringsEnum.EMPTY_STRING) {
            optimizedWebapp.description = val;
        }
        val = webapp.version;
        if (val && val !== jec_commons_1.UrlStringsEnum.EMPTY_STRING) {
            optimizedWebapp.version = val;
        }
        val = webapp.author;
        if (val && val !== jec_commons_1.UrlStringsEnum.EMPTY_STRING) {
            optimizedWebapp.author = val;
        }
        val = webapp.state;
        if (val) {
            optimizedWebapp.state = val;
        }
        result.webapp = optimizedWebapp;
    }
    optimizeBootstrapConfig(result, config) {
        let len = -1;
        let bootstrapArr = null;
        let bootstrapCfg = null;
        let obj = null;
        let priority = null;
        if (config) {
            len = config.length;
            if (len > 0) {
                bootstrapArr = new Array();
                while (len--) {
                    bootstrapCfg = config[len];
                    obj = {
                        path: bootstrapCfg.path
                    };
                    priority = bootstrapCfg.priority;
                    if (priority)
                        obj.priority = priority;
                    bootstrapArr.push(obj);
                }
                result.webapp.bootstrap = bootstrapArr;
            }
        }
    }
    optimizeJsletConfig(result, jsletConfig) {
        let len = -1;
        let jsletsArr = null;
        let jslets = null;
        let resultConfig = null;
        let configFile = null;
        let enableAutowire = false;
        if (jsletConfig) {
            jsletsArr = jsletConfig.config;
            enableAutowire = jsletConfig.enableAutowire;
            if (enableAutowire || jsletsArr) {
                resultConfig = {};
                if (enableAutowire)
                    resultConfig.enableAutowire = enableAutowire;
                len = jsletsArr.length;
                if (len > 0) {
                    jslets = new Array();
                    while (len--) {
                        jslets.push(jsletsArr[len]);
                    }
                    resultConfig.config = jslets;
                }
            }
            configFile = jsletConfig.configFile;
            if (configFile) {
                if (!resultConfig)
                    resultConfig = {};
                resultConfig.configFile = configFile;
            }
            if (resultConfig)
                result.webapp.jslets = resultConfig;
        }
    }
    optimizeLoginConfig(result, loginConfig) {
        let login = null;
        let formConfig = null;
        let realmConfig = null;
        let optConfig = null;
        let value = null;
        let authMethod = null;
        if (loginConfig) {
            authMethod = loginConfig.authMethod;
            if (authMethod && authMethod !== jec_exchange_1.AuthMethod.NONE) {
                login = { authMethod: authMethod };
                formConfig = loginConfig.formConfig;
                if (formConfig) {
                    optConfig = {};
                    value = formConfig.errorUrl;
                    if (value)
                        optConfig.errorUrl = value;
                    value = formConfig.loginUrl;
                    if (value)
                        optConfig.loginUrl = value;
                    login.formConfig = optConfig;
                }
                realmConfig = loginConfig.realm;
                if (realmConfig) {
                    optConfig = {};
                    value = realmConfig.type;
                    if (value)
                        optConfig.type = value;
                    value = realmConfig.securedArea;
                    if (value)
                        optConfig.securedArea = value;
                    value = realmConfig.connectorFactory;
                    if (value)
                        optConfig.connectorFactory = value;
                    login.realm = optConfig;
                }
                result.webapp.login = login;
            }
        }
    }
    optimizeSessionConfig(result, sessionConfig) {
        let session = null;
        let value = null;
        let maxAge = null;
        if (sessionConfig) {
            value = sessionConfig.storage;
            if (value) {
                session = { storage: value };
                value = sessionConfig.errorUrl;
                if (value)
                    session.errorUrl = value;
                maxAge = sessionConfig.maxAge;
                if (maxAge)
                    session.maxAge = maxAge;
                result.webapp.session = session;
            }
        }
    }
    optimizeResourceMapConfig(result, resourceMapper) {
        if (resourceMapper && resourceMapper.length > 0) {
            result.webapp.resourceMap = resourceMapper.slice(0);
        }
    }
    optimizeSecurityConfig(result, securityConfig) {
        let rolesConfig = null;
        let hasRoles = false;
        let constraintsConfig = null;
        let hasConstraints = false;
        let staticResourcesConfig = null;
        let hasStaticResources = false;
        let security = null;
        if (securityConfig) {
            rolesConfig = securityConfig.roles;
            constraintsConfig = securityConfig.constraints;
            staticResourcesConfig = securityConfig.staticResources;
            hasRoles = rolesConfig && rolesConfig.length > 0;
            hasConstraints = constraintsConfig && constraintsConfig.length > 0;
            hasStaticResources =
                staticResourcesConfig && staticResourcesConfig.length > 0;
            if (hasRoles || hasConstraints || hasStaticResources) {
                security = {};
                if (hasRoles)
                    security.roles = this.optimizeRoles(rolesConfig);
                if (hasConstraints) {
                    security.constraints = this.optimizeConstraints(constraintsConfig);
                }
                if (hasStaticResources) {
                    security.staticResources =
                        this.optimizeStaticResources(staticResourcesConfig);
                }
                result.webapp.security = security;
            }
        }
    }
    optimizeRoles(rolesConfig) {
        let roles = new Array();
        let len = rolesConfig.length;
        while (len--) {
            roles.push(rolesConfig[len]);
        }
        return roles;
    }
    optimizeConstraints(constraintsConfig) {
        let constraints = new Array();
        let len = constraintsConfig.length;
        while (len--) {
            constraints.push(constraintsConfig[len]);
        }
        return constraints;
    }
    optimizeStaticResources(staticResourcesConfig) {
        let resources = new Array();
        let len = staticResourcesConfig.length;
        while (len--) {
            resources.push(staticResourcesConfig[len]);
        }
        return resources;
    }
    serialize(config, success, error, optimize = false) {
        let data = null;
        this._validator.validate(config, (err) => {
            if (err) {
                error(err);
            }
            else {
                try {
                    data = this.stringify(config, optimize);
                    success(data);
                }
                catch (e) {
                    const logManager = LoggerManager_1.LoggerManager.getInstance();
                    if (logManager.isInitialized())
                        logManager.error(e);
                    const glassCatErr = new GlassCatError_1.GlassCatError(GlassCatErrorCode_1.GlassCatErrorCode.CONFIG_SERIALIZATION_ERROR, e);
                    error(glassCatErr);
                }
            }
        });
    }
}
exports.EjpConfigSerializer = EjpConfigSerializer;
;
