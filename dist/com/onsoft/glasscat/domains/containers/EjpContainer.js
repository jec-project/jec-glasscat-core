"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggerManager_1 = require("../../util/logging/LoggerManager");
const JsletContextBuilder_1 = require("../../jslets/utils/JsletContextBuilder");
const GlassCatLocaleManager_1 = require("../../i18n/GlassCatLocaleManager");
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
const NotFoundErrorBuilder_1 = require("../errors/NotFoundErrorBuilder");
const BootstrapAutowireProcessor_1 = require("../../startup/utils/BootstrapAutowireProcessor");
const BootstrapContextManager_1 = require("../../startup/jcad/BootstrapContextManager");
const BootstrapContextBuilder_1 = require("../../startup/utils/BootstrapContextBuilder");
const BootstrapScriptBuilder_1 = require("../../startup/utils/BootstrapScriptBuilder");
const jec_sokoke_1 = require("jec-sokoke");
class EjpContainer {
    constructor() {
        this._connector = null;
        this._jsletManager = null;
        this._jsletContext = null;
        this._bootstrapContext = null;
        this._contextRoot = null;
        this._webapp = null;
        this._src = null;
        this._welcomeFile = null;
        this._state = null;
        this._locale = null;
        this._resourceMap = null;
        this._sourceFileInspector = null;
        this._templateProcessor = null;
        this._loginStrategy = null;
        this._jsletContextManager = null;
        this._jdiContextManager = null;
        this._bootstrapContextManager = null;
        this._notFoundErrorBuilder = null;
    }
    initConfig(config) {
        let securityContext = null;
        let sessionContext = null;
        let webapp = config.webapp;
        let jsletsConfig = webapp.jslets;
        let jsletContextBuilder = JsletContextBuilder_1.JsletContextBuilder.getInstance();
        this.initState(config);
        this.initResourceMap(config);
        if (this._state === DomainState_1.DomainState.STATEFUL) {
            securityContext = this.initSecurityContext(config);
            sessionContext = this.initSessionContext(config);
            this.createLoginStrategy(config);
            this._jsletContext = jsletContextBuilder.buildContext(this._connector, securityContext, sessionContext, this._loginStrategy);
            this.initLoginStrategy();
        }
        else {
            this._jsletContext = jsletContextBuilder.buildContext(this._connector, null, null, null);
        }
        this.initBootstrapScripts(config);
        this.initJdiEngine();
        this.initJsletAutowireProcessor(jsletsConfig);
        this._sourceFileInspector.inspect(jec_commons_1.InspectMode.READ_CACHE);
        if (webapp.jslets) {
            jsletContextBuilder.initJslets(this._jsletContext, jsletsConfig.config);
        }
        this._jsletManager.addContext(this._contextRoot, this._jsletContext);
        this._welcomeFile = config.webapp.welcomeFile;
        this._notFoundErrorBuilder = new NotFoundErrorBuilder_1.NotFoundErrorBuilder();
        this._sourceFileInspector.clearCache();
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
        let msg = null;
        if (state) {
            if (state === DomainState_1.DomainState.STATEFUL || state === DomainState_1.DomainState.STATELESS) {
                this._state = state;
            }
            else {
                msg = GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance().get("errors.invalidState");
                LoggerManager_1.LoggerManager.getInstance().error(msg);
                throw new Error(msg);
            }
        }
        else
            this._state = DomainState_1.DomainState.STATELESS;
    }
    initBootstrapScripts(config) {
        let scripts = config.webapp.bootstrap;
        let scriptConfig = null;
        let script = null;
        let len = -1;
        let builder = new BootstrapScriptBuilder_1.BootstrapScriptBuilder();
        let autoWireProcessor = new BootstrapAutowireProcessor_1.BootstrapAutowireProcessor();
        this._bootstrapContext =
            BootstrapContextBuilder_1.BootstrapContextBuilder.getInstance().buildContext(this._connector);
        if (scripts) {
            len = scripts.length;
            while (len--) {
                scriptConfig = scripts[len];
                script = builder.build(this._src + scriptConfig.path);
                this._bootstrapContext.addScript(script);
            }
        }
        this.getSourceFileInspector().addProcessor(autoWireProcessor);
        this._sourceFileInspector.inspect(jec_commons_1.InspectMode.FILL_CACHE);
        this._sourceFileInspector.removeProcessor(autoWireProcessor);
    }
    initJsletAutowireProcessor(jsletsConfig) {
        if (jsletsConfig.enableAutowire) {
            this.getSourceFileInspector().addProcessor(new JsletsAutowireProcessor_1.JsletsAutowireProcessor());
        }
    }
    initJdiEngine() {
        jec_sokoke_1.SokokeLoggerProxy.getInstance().setLogger(this.getLogger());
        this.getSourceFileInspector().addProcessor(new jec_sokoke_1.SokokeAutowireProcessor());
    }
    initSessionContext(config) {
        let sessionContext = new EjpSessionContext_1.EjpSessionContext(this._contextRoot, config);
        let msg = GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance().get("security.context.sessionAdded", this._contextRoot);
        LoggerManager_1.LoggerManager.getInstance().info(msg);
        return sessionContext;
    }
    initSecurityContext(config) {
        let security = config.webapp.security;
        let securityContext = new EjpSecurityContext_1.EjpSecurityContext(this._contextRoot);
        let constraint = null;
        let staticRes = null;
        let Contructor = null;
        let loader = jec_commons_1.GlobalClassLoader.getInstance();
        let constraints = null;
        let resources = null;
        let resourcesBuilder = null;
        let securityConstraintBuilder = null;
        let roles = null;
        let role = null;
        let len = -1;
        let msg = GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance().get("security.context.securityAdded", this._contextRoot);
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
    initJecContextManagers() {
        let containerContext = this._connector.getJcadContext();
        this._jdiContextManager = new jec_sokoke_1.JdiContextManager();
        this._jdiContextManager.createContext(containerContext);
        this._jsletContextManager = new JsletContextManager_1.JsletContextManager();
        this._jsletContextManager.createContext(containerContext);
    }
    deleteJecContextManagers() {
        this._jsletContextManager.deleteContext();
        this._jdiContextManager.deleteContext();
    }
    initBootstrapContextManager() {
        this._bootstrapContextManager = new BootstrapContextManager_1.BootstrapContextManager();
        this._bootstrapContextManager.createContext(this._connector.getJcadContext());
    }
    deleteBootstrapContextManager() {
        this._bootstrapContextManager.deleteContext();
    }
    init(connector, jsletManager) {
        let i18n = GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance();
        let msg = "domain container initialization start";
        LoggerManager_1.LoggerManager.getInstance().info(msg);
        msg = "domain connector: name=" + connector.getName();
        LoggerManager_1.LoggerManager.getInstance().info(msg);
        this._locale = GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance().getLocale();
        this._connector = connector;
        this._jsletManager = jsletManager;
        this._contextRoot = connector.getContextRoot();
        let target = connector.getTarget();
        this._webapp = target + jec_commons_1.JecStringsEnum.WEB_APP;
        this._src = target + jec_commons_1.JecStringsEnum.SRC;
        this._templateProcessor = new DefaultTemplateProcessor_1.DefaultTemplateProcessor();
        this.initBootstrapContextManager();
        this.initJecContextManagers();
        this.initSourceFileInspector();
        this.initConfig(connector.getConfig());
        this.deleteBootstrapContextManager();
        this.deleteJecContextManagers();
        msg = i18n.get("domains.containers.init");
        msg += "\n   => " + i18n.get("domains.containers.contextRoot", this._contextRoot);
        msg += "\n   * " + i18n.get("domains.containers.type", this.toString());
        LoggerManager_1.LoggerManager.getInstance().info(msg);
    }
    getJsletContext() {
        return this._jsletContext;
    }
    getBootstrapContext() {
        return this._bootstrapContext;
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
    getLocale() {
        return this._locale;
    }
    toString() {
        return "[DomainContainer::EjpContainer]";
    }
    getMappedResource(name) {
        return this._resourceMap.get(name);
    }
}
exports.EjpContainer = EjpContainer;
