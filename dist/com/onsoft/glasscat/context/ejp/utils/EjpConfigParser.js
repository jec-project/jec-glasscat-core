"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EjpConfig_1 = require("../EjpConfig");
const EjpWebAppConfig_1 = require("../EjpWebAppConfig");
const EjpJsletsConfig_1 = require("../EjpJsletsConfig");
const EjpBootstrapConfig_1 = require("../EjpBootstrapConfig");
const EjpSessionConfig_1 = require("../EjpSessionConfig");
const EjpResourceMapperConfig_1 = require("../EjpResourceMapperConfig");
const EjpLoginConfig_1 = require("../EjpLoginConfig");
const EjpFormConfig_1 = require("../EjpFormConfig");
const EjpRealmConfig_1 = require("../EjpRealmConfig");
const EjpSecurityConfig_1 = require("../EjpSecurityConfig");
const EjpConstraintConfig_1 = require("../EjpConstraintConfig");
const EjpRoleConfig_1 = require("../EjpRoleConfig");
const EjpStaticResourcesConfig_1 = require("../EjpStaticResourcesConfig");
class EjpConfigParser {
    constructor() { }
    parseWebApp(manifest) {
        let webapp = manifest.webapp;
        let cfg = new EjpWebAppConfig_1.EjpWebAppConfig();
        cfg.name = webapp.name;
        cfg.description = webapp.description;
        cfg.version = webapp.version;
        cfg.author = webapp.author;
        cfg.contextRoot = webapp.contextRoot;
        cfg.state = webapp.state;
        cfg.welcomeFile = webapp.welcomeFile;
        cfg.jslets = this.parseJslets(manifest);
        cfg.bootstrap = this.parseBootstrapFiles(manifest);
        cfg.session = this.parseSession(manifest);
        cfg.resourceMap = this.parseResourceMap(manifest);
        cfg.login = this.parseLogin(manifest);
        cfg.security = this.parseSecurity(manifest);
        return cfg;
    }
    parseSecurity(manifest) {
        let security = manifest.webapp.security;
        let cfg = new EjpSecurityConfig_1.EjpSecurityConfig();
        if (security) {
            cfg.constraints = this.parseConstraintsConfig(security.constraints);
            cfg.roles = this.parseRolesConfig(security.roles);
            cfg.staticResources = this.parseStaticConfig(security.staticResources);
        }
        else {
            cfg.constraints = this.parseConstraintsConfig(null);
            cfg.roles = this.parseRolesConfig(null);
            cfg.staticResources = this.parseStaticConfig(null);
        }
        return cfg;
    }
    parseStaticConfig(staticResources) {
        let cfg = new Array();
        let len = -1;
        let resourcesConfig = null;
        let rawResourcesConfig = null;
        if (staticResources) {
            len = staticResources.length;
            while (len--) {
                rawResourcesConfig = staticResources[len];
                resourcesConfig = new EjpStaticResourcesConfig_1.EjpStaticResourcesConfig();
                resourcesConfig.urlPattern = rawResourcesConfig.urlPattern;
                cfg.push(resourcesConfig);
            }
        }
        return cfg;
    }
    parseRolesConfig(roles) {
        let cfg = new Array();
        let len = -1;
        let roleConfig = null;
        let rawRole = null;
        if (roles) {
            len = roles.length;
            while (len--) {
                rawRole = roles[len];
                roleConfig = new EjpRoleConfig_1.EjpRoleConfig();
                roleConfig.name = rawRole.name;
                roleConfig.path = rawRole.path;
                cfg.push(roleConfig);
            }
        }
        return cfg;
    }
    parseConstraintsConfig(constraints) {
        let cfg = new Array();
        let len = -1;
        let constraintConfig = null;
        let rawConstraint = null;
        if (constraints) {
            len = constraints.length;
            while (len--) {
                rawConstraint = constraints[len];
                constraintConfig = new EjpConstraintConfig_1.EjpConstraintConfig();
                constraintConfig.name = rawConstraint.name;
                constraintConfig.roles = rawConstraint.roles;
                constraintConfig.urlPattern = rawConstraint.urlPattern;
                constraintConfig.errorUrl = rawConstraint.errorUrl;
                cfg.push(constraintConfig);
            }
        }
        return cfg;
    }
    parseLogin(manifest) {
        let login = manifest.webapp.login;
        let cfg = new EjpLoginConfig_1.EjpLoginConfig();
        if (login) {
            cfg.authMethod = login.authMethod;
            cfg.formConfig = this.parseFormConfig(manifest);
            cfg.realm = this.parseRealm(manifest);
        }
        else {
            cfg.formConfig = new EjpFormConfig_1.EjpFormConfig();
            cfg.realm = new EjpRealmConfig_1.EjpRealmConfig();
        }
        return cfg;
    }
    parseFormConfig(manifest) {
        let form = manifest.webapp.login.formConfig;
        let cfg = new EjpFormConfig_1.EjpFormConfig();
        if (form) {
            cfg.loginUrl = form.loginUrl;
            cfg.errorUrl = form.errorUrl;
        }
        return cfg;
    }
    parseRealm(manifest) {
        let realm = manifest.webapp.login.realm;
        let cfg = new EjpRealmConfig_1.EjpRealmConfig();
        if (realm) {
            cfg.type = realm.type;
            cfg.securedArea = realm.securedArea;
            cfg.connectorFactory = realm.connectorFactory;
        }
        return cfg;
    }
    parseJslets(manifest) {
        let jslets = manifest.webapp.jslets;
        let cfg = new EjpJsletsConfig_1.EjpJsletsConfig();
        if (jslets) {
            if (jslets.enableAutowire !== undefined) {
                cfg.enableAutowire = jslets.enableAutowire;
            }
            cfg.configFile = jslets.configFile;
            cfg.config = jslets.config;
        }
        if (!cfg.config) {
            cfg.config = new Array();
        }
        return cfg;
    }
    parseBootstrapFiles(manifest) {
        let cfg = new Array();
        let bootstrapFiles = manifest.webapp.bootstrap;
        let len = -1;
        let file = null;
        let configFile = null;
        if (bootstrapFiles) {
            len = bootstrapFiles.length;
            while (len--) {
                file = bootstrapFiles[len];
                configFile = new EjpBootstrapConfig_1.EjpBootstrapConfig();
                configFile.path = file.path;
                configFile.priority = file.priority;
                cfg.push(configFile);
            }
        }
        return cfg;
    }
    parseResourceMap(manifest) {
        let cfg = new Array();
        let resourceMapCfg = manifest.webapp.resourceMap;
        let len = -1;
        let mapObj = null;
        let mapper = null;
        let name = null;
        if (resourceMapCfg) {
            len = resourceMapCfg.length;
            while (len--) {
                mapObj = resourceMapCfg[len];
                mapper = new EjpResourceMapperConfig_1.EjpResourceMapperConfig();
                mapper.name = mapObj.name;
                mapper.value = mapObj.value;
                cfg.push(mapper);
            }
        }
        return cfg;
    }
    parseSession(manifest) {
        let cfg = new EjpSessionConfig_1.EjpSessionConfig();
        let session = manifest.webapp.session;
        if (session) {
            cfg.storage = session.storage;
            cfg.errorUrl = session.errorUrl;
            if (session.maxAge)
                cfg.maxAge = session.maxAge;
        }
        return cfg;
    }
    parse(manifest) {
        let cfg = new EjpConfig_1.EjpConfig();
        cfg.webapp = this.parseWebApp(manifest);
        return cfg;
    }
}
exports.EjpConfigParser = EjpConfigParser;
