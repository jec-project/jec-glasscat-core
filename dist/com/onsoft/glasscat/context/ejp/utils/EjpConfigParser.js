"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EjpWebAppConfigImpl_1 = require("../EjpWebAppConfigImpl");
const EjpSecurityConfigImpl_1 = require("../EjpSecurityConfigImpl");
const EjpStaticResourcesConfigImpl_1 = require("../EjpStaticResourcesConfigImpl");
const EjpRoleConfigImpl_1 = require("../EjpRoleConfigImpl");
const EjpConstraintConfigImpl_1 = require("../EjpConstraintConfigImpl");
const EjpLoginConfigImpl_1 = require("../EjpLoginConfigImpl");
const EjpFormConfigImpl_1 = require("../EjpFormConfigImpl");
const EjpRealmConfigImpl_1 = require("../EjpRealmConfigImpl");
const EjpJsletsConfigImpl_1 = require("../EjpJsletsConfigImpl");
const EjpBootstrapConfigImpl_1 = require("../EjpBootstrapConfigImpl");
const EjpResourceMapperConfigImpl_1 = require("../EjpResourceMapperConfigImpl");
const EjpSessionConfigImpl_1 = require("../EjpSessionConfigImpl");
const EjpConfigImpl_1 = require("../EjpConfigImpl");
class EjpConfigParser {
    constructor() { }
    parseWebApp(manifest) {
        const webapp = manifest.webapp;
        const cfg = new EjpWebAppConfigImpl_1.EjpWebAppConfigImpl();
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
        const security = manifest.webapp.security;
        const cfg = new EjpSecurityConfigImpl_1.EjpSecurityConfigImpl();
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
        const cfg = new Array();
        let len = -1;
        let resourcesConfig = null;
        let rawResourcesConfig = null;
        if (staticResources) {
            len = staticResources.length;
            while (len--) {
                rawResourcesConfig = staticResources[len];
                resourcesConfig = new EjpStaticResourcesConfigImpl_1.EjpStaticResourcesConfigImpl();
                resourcesConfig.urlPattern = rawResourcesConfig.urlPattern;
                cfg.push(resourcesConfig);
            }
        }
        return cfg;
    }
    parseRolesConfig(roles) {
        const cfg = new Array();
        let len = -1;
        let roleConfig = null;
        let rawRole = null;
        if (roles) {
            len = roles.length;
            while (len--) {
                rawRole = roles[len];
                roleConfig = new EjpRoleConfigImpl_1.EjpRoleConfigImpl();
                roleConfig.name = rawRole.name;
                roleConfig.path = rawRole.path;
                cfg.push(roleConfig);
            }
        }
        return cfg;
    }
    parseConstraintsConfig(constraints) {
        const cfg = new Array();
        let len = -1;
        let constraintConfig = null;
        let rawConstraint = null;
        if (constraints) {
            len = constraints.length;
            while (len--) {
                rawConstraint = constraints[len];
                constraintConfig = new EjpConstraintConfigImpl_1.EjpConstraintConfigImpl();
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
        const login = manifest.webapp.login;
        const cfg = new EjpLoginConfigImpl_1.EjpLoginConfigImpl();
        if (login) {
            cfg.authMethod = login.authMethod;
            cfg.formConfig = this.parseFormConfig(manifest);
            cfg.realm = this.parseRealm(manifest);
        }
        else {
            cfg.formConfig = new EjpFormConfigImpl_1.EjpFormConfigImpl();
            cfg.realm = new EjpRealmConfigImpl_1.EjpRealmConfigImpl();
        }
        return cfg;
    }
    parseFormConfig(manifest) {
        const form = manifest.webapp.login.formConfig;
        const cfg = new EjpFormConfigImpl_1.EjpFormConfigImpl();
        if (form) {
            cfg.loginUrl = form.loginUrl;
            cfg.errorUrl = form.errorUrl;
        }
        return cfg;
    }
    parseRealm(manifest) {
        const realm = manifest.webapp.login.realm;
        const cfg = new EjpRealmConfigImpl_1.EjpRealmConfigImpl();
        if (realm) {
            cfg.type = realm.type;
            cfg.securedArea = realm.securedArea;
            cfg.connectorFactory = realm.connectorFactory;
        }
        return cfg;
    }
    parseJslets(manifest) {
        const jslets = manifest.webapp.jslets;
        const cfg = new EjpJsletsConfigImpl_1.EjpJsletsConfigImpl();
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
        const cfg = new Array();
        const bootstrapFiles = manifest.webapp.bootstrap;
        let len = -1;
        let file = null;
        let configFile = null;
        if (bootstrapFiles) {
            len = bootstrapFiles.length;
            while (len--) {
                file = bootstrapFiles[len];
                configFile = new EjpBootstrapConfigImpl_1.EjpBootstrapConfigImpl();
                configFile.path = file.path;
                configFile.priority = file.priority;
                cfg.push(configFile);
            }
        }
        return cfg;
    }
    parseResourceMap(manifest) {
        const cfg = new Array();
        const resourceMapCfg = manifest.webapp.resourceMap;
        let len = -1;
        let mapObj = null;
        let mapper = null;
        let name = null;
        if (resourceMapCfg) {
            len = resourceMapCfg.length;
            while (len--) {
                mapObj = resourceMapCfg[len];
                mapper = new EjpResourceMapperConfigImpl_1.EjpResourceMapperConfigImpl();
                mapper.name = mapObj.name;
                mapper.value = mapObj.value;
                cfg.push(mapper);
            }
        }
        return cfg;
    }
    parseSession(manifest) {
        const cfg = new EjpSessionConfigImpl_1.EjpSessionConfigImpl();
        const session = manifest.webapp.session;
        if (session) {
            cfg.storage = session.storage;
            cfg.errorUrl = session.errorUrl;
            if (session.maxAge)
                cfg.maxAge = session.maxAge;
        }
        return cfg;
    }
    parse(manifest) {
        const cfg = new EjpConfigImpl_1.EjpConfigImpl();
        cfg.webapp = this.parseWebApp(manifest);
        return cfg;
    }
}
exports.EjpConfigParser = EjpConfigParser;
