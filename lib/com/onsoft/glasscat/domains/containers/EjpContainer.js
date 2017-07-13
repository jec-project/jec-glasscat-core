"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggerManager_1 = require("../../util/logging/LoggerManager");
const JsletContextBuilder_1 = require("../../jslets/utils/JsletContextBuilder");
const LocaleManager_1 = require("../../i18n/LocaleManager");
const DefaultTemplateProcessor_1 = require("../../templates/DefaultTemplateProcessor");
const StaticResourcesBuilder_1 = require("../../security/utils/StaticResourcesBuilder");
const SecurityConstraintBuilder_1 = require("../../security/utils/SecurityConstraintBuilder");
const EjpSecurityContext_1 = require("../../security/context/EjpSecurityContext");
const DomainState_1 = require("./DomainState");
const EjpSessionContext_1 = require("../../security/context/EjpSessionContext");
const DomainRequestError_1 = require("../errors/DomainRequestError");
const EjpLoginStrategyConfig_1 = require("../../security/login/config/EjpLoginStrategyConfig");
const LoginStrategy_1 = require("../../security/login/LoginStrategy");
const DefaultSourceFileInspector_1 = require("../../context/files/DefaultSourceFileInspector");
const jec_commons_1 = require("jec-commons");
const JsletsAutowireProcessor_1 = require("../../jslets/utils/JsletsAutowireProcessor");
const JsletContextManager_1 = require("../../jslets/jcad/JsletContextManager");
const BootstrapScriptSorter_1 = require("../../util/bootstrap/BootstrapScriptSorter");
const NotFoundErrorBuilder_1 = require("../errors/NotFoundErrorBuilder");
class EjpContainer {
    constructor() {
        this._connector = null;
        this._jsletManager = null;
        this._jsletContext = null;
        this._contextRoot = null;
        this._webapp = null;
        this._src = null;
        this._welcomeFile = null;
        this._state = null;
        this._resourceMap = null;
        this._sourceFileInspector = null;
        this._templateProcessor = null;
        this._loginStrategy = null;
        this._contextManager = null;
        this._notFoundErrorBuilder = null;
    }
    initConfig(config) {
        let securityContext = null;
        let sessionContext = null;
        let webapp = config.webapp;
        let jsletsConfig = webapp.jslets;
        let builder = JsletContextBuilder_1.JsletContextBuilder.getInstance();
        this.initState(config);
        this.initResourceMap(config);
        if (this._state === DomainState_1.DomainState.STATEFUL) {
            securityContext = this.initSecurityContext(config);
            sessionContext = this.initSessionContext(config);
            this.createLoginStrategy(config);
            this._jsletContext = builder.buildContext(this._connector, securityContext, sessionContext, this._loginStrategy);
            this.initLoginStrategy();
        }
        else {
            this._jsletContext = builder.buildContext(this._connector, null, null, null);
        }
        if (jsletsConfig.enableAutowire) {
            this.getSourceFileInspector().addProcessor(new JsletsAutowireProcessor_1.JsletsAutowireProcessor());
        }
        this.initBootstrapScripts(config);
        this._sourceFileInspector.inspect();
        if (webapp.jslets) {
            builder.initJslets(this._jsletContext, jsletsConfig.config);
        }
        this._jsletManager.addContext(this._contextRoot, this._jsletContext);
        this._welcomeFile = config.webapp.welcomeFile;
        this._notFoundErrorBuilder = new NotFoundErrorBuilder_1.NotFoundErrorBuilder();
    }
    createLoginStrategy(config) {
        let loginStrategyConfig = new EjpLoginStrategyConfig_1.EjpLoginStrategyConfig(config.webapp.login);
        this._loginStrategy = new LoginStrategy_1.LoginStrategy(loginStrategyConfig);
    }
    ;
    initResourceMap(config) {
        let resourceMap = config.webapp.resourceMap;
        let len = -1;
        let resourceMapper = null;
        this._resourceMap = new Map();
        if (resourceMap) {
            len = resourceMap.length;
            while (len--) {
                resourceMapper = resourceMap[len];
                this._resourceMap.set(resourceMapper.name, resourceMapper.value);
            }
        }
    }
    initLoginStrategy() {
        this._loginStrategy.initStrategy(this);
    }
    ;
    initState(config) {
        let state = config.webapp.state;
        if (state) {
            if (state === DomainState_1.DomainState.STATEFUL || state === DomainState_1.DomainState.STATELESS) {
                this._state = state;
            }
            else {
                let msg = LocaleManager_1.LocaleManager.getInstance().get("errors.invalidState");
                LoggerManager_1.LoggerManager.getInstance().error(msg);
                throw new Error(msg);
            }
        }
        else
            this._state = DomainState_1.DomainState.STATELESS;
    }
    initBootstrapScripts(config) {
        let loader = new jec_commons_1.ClassLoader();
        let scripts = config.webapp.bootstrap;
        let script = null;
        let Contructor = null;
        let sorter = null;
        let len = -1;
        if (scripts) {
            sorter = new BootstrapScriptSorter_1.BootstrapScriptSorter();
            sorter.sortCollection(scripts);
            len = scripts.length;
            while (len--) {
                script = scripts[len];
                Contructor = loader.loadClass(this._src + script.path);
                new Contructor().run(this);
            }
        }
    }
    initSessionContext(config) {
        let sessionContext = new EjpSessionContext_1.EjpSessionContext(this._contextRoot, config);
        let msg = LocaleManager_1.LocaleManager.getInstance()
            .get("security.context.sessionAdded", this._contextRoot);
        LoggerManager_1.LoggerManager.getInstance().info(msg);
        return sessionContext;
    }
    initSecurityContext(config) {
        let security = config.webapp.security;
        let securityContext = new EjpSecurityContext_1.EjpSecurityContext(this._contextRoot);
        let constraint = null;
        let staticRes = null;
        let Contructor = null;
        let loader = new jec_commons_1.ClassLoader();
        let constraints = null;
        let resources = null;
        let resourcesBuilder = null;
        let securityConstraintBuilder = null;
        let roles = null;
        let role = null;
        let len = -1;
        let msg = LocaleManager_1.LocaleManager.getInstance()
            .get("security.context.securityAdded", this._contextRoot);
        LoggerManager_1.LoggerManager.getInstance().info(msg);
        if (security) {
            resourcesBuilder = new StaticResourcesBuilder_1.StaticResourcesBuilder();
            securityConstraintBuilder = new SecurityConstraintBuilder_1.SecurityConstraintBuilder();
            constraints = security.constraints;
            len = constraints.length;
            while (len--) {
                constraint = securityConstraintBuilder.build(constraints[len]);
                securityContext.addSecurityConstraint(constraint);
            }
            resources = security.staticResources;
            len = resources.length;
            while (len--) {
                staticRes = resourcesBuilder.build(resources[len]);
                securityContext.addStaticResources(staticRes);
            }
            roles = security.roles;
            len = roles.length;
            while (len--) {
                role = roles[len];
                Contructor = loader.loadClass(this._src + role.path);
                securityContext.addSecurityRole(new Contructor());
            }
        }
        return securityContext;
    }
    initSourceFileInspector() {
        this._sourceFileInspector = new DefaultSourceFileInspector_1.DefaultSourceFileInspector();
        this._sourceFileInspector.setWatcher(this._connector);
    }
    initJsletContextManager() {
        this._contextManager = new JsletContextManager_1.JsletContextManager();
        this._contextManager.createContext(this._connector.getJcadContext());
    }
    deleteJsletContextManager() {
        this._contextManager.deleteContext();
    }
    init(connector, jsletManager) {
        let i18n = LocaleManager_1.LocaleManager.getInstance();
        let msg = "domain container initialization start";
        LoggerManager_1.LoggerManager.getInstance().info(msg);
        msg = "domain connector: name=" + connector.getName();
        LoggerManager_1.LoggerManager.getInstance().info(msg);
        this._connector = connector;
        this._jsletManager = jsletManager;
        this._contextRoot = connector.getContextRoot();
        let target = connector.getTarget();
        this._webapp = target + jec_commons_1.JecStringsEnum.WEB_APP;
        this._src = target + jec_commons_1.JecStringsEnum.SRC;
        this._templateProcessor = new DefaultTemplateProcessor_1.DefaultTemplateProcessor();
        this.initJsletContextManager();
        this.initSourceFileInspector();
        this.initConfig(connector.getConfig());
        this.deleteJsletContextManager();
        msg = i18n.get("domains.containers.init");
        msg += "\n   => " + i18n.get("domains.containers.contextRoot", this._contextRoot);
        msg += "\n   * " + i18n.get("domains.containers.type", this.toString());
        LoggerManager_1.LoggerManager.getInstance().info(msg);
    }
    getJsletContext() {
        return this._jsletContext;
    }
    getLoginStrategy() {
        return this._loginStrategy;
    }
    getSourceFileInspector() {
        return this._sourceFileInspector;
    }
    getLogger() {
        return LoggerManager_1.LoggerManager.getInstance();
    }
    process(properties, req, res, result) {
        let urlMarkIndex = -1;
        let self = this;
        let sessionId = properties.sessionId;
        let domainRequestError = null;
        let jslet = null;
        let url = properties.trimmedUrl;
        let isStateful = this._state === DomainState_1.DomainState.STATEFUL;
        let sessionContext = this._jsletContext.getSessionContext();
        jslet = this._jsletManager.getJslet(this._contextRoot, url);
        if (jslet) {
            jslet.before();
            jslet.service(req, res, function (request, response, data) {
                let renderTemplate = function () {
                    let ejsPath = jslet.getTemplate();
                    if (ejsPath) {
                        self._templateProcessor.renderFile((self._webapp + ejsPath), data, request, response);
                    }
                    jslet.after();
                    result();
                };
                if (isStateful) {
                    if (sessionContext.hasSession(sessionId)) {
                        sessionContext.refreshSession(sessionId, null, (err) => {
                            if (err) {
                                domainRequestError = new DomainRequestError_1.DomainRequestError();
                                domainRequestError.statusCode =
                                    jec_commons_1.HttpStatusCode.INTERNAL_SERVER_ERROR;
                                domainRequestError.message = err.getMessage();
                                result(domainRequestError);
                            }
                            else
                                renderTemplate();
                        });
                    }
                    else
                        renderTemplate();
                }
                else
                    renderTemplate();
            });
        }
        else {
            if (url.length === 0) {
                if (this._welcomeFile) {
                    res.sendFile(this._welcomeFile, { root: this._webapp });
                    result();
                }
                else {
                    result(this._notFoundErrorBuilder.build());
                }
            }
            else {
                urlMarkIndex = url.indexOf(jec_commons_1.UrlStringsEnum.MARK);
                if (urlMarkIndex !== -1)
                    url = url.substr(0, urlMarkIndex);
                res.sendFile(url, { root: this._webapp });
                result();
            }
        }
        ;
    }
    getState() {
        return this._state;
    }
    toString() {
        return "[DomainContainer::EjpContainer]";
    }
    getMappedResource(name) {
        return this._resourceMap.get(name);
    }
}
exports.EjpContainer = EjpContainer;
