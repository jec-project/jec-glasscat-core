"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GlassCatContextBuilder_1 = require("../context/utils/GlassCatContextBuilder");
const HttpServiceManager_1 = require("./HttpServiceManager");
const SplashScreen_1 = require("./SplashScreen");
const HttpServiceBuilder_1 = require("../services/http/utils/HttpServiceBuilder");
const GlassCatLocaleManager_1 = require("../i18n/GlassCatLocaleManager");
const DomainConnectorManagerBuilder_1 = require("../domains/connectors/utils/DomainConnectorManagerBuilder");
const JsletManager_1 = require("./JsletManager");
const HttpStatusReportBuilder_1 = require("../templates/status/HttpStatusReportBuilder");
const SecurityManager_1 = require("./SecurityManager");
const UrlUtils_1 = require("../util/url/UrlUtils");
const MappedPathUtil_1 = require("../util/paths/MappedPathUtil");
const jec_commons_1 = require("jec-commons");
class Kernel {
    constructor() {
        this._startTime = 0;
        this._context = null;
        this._httpServiceManager = null;
        this._domainConnectorManager = null;
        this._jsletManager = null;
        this._securityManager = null;
        this._jcadContext = null;
        this.init();
    }
    init() {
        const splashScreen = new SplashScreen_1.SplashScreen();
        splashScreen.displayMessage(Kernel.VERSION);
        this.initJcadContext();
    }
    initJcadContext() {
        const ctxFactory = new jec_commons_1.JcadContextFactory();
        this._jcadContext = ctxFactory.create();
    }
    createHttpListeners() {
        this._httpServiceManager = new HttpServiceManager_1.HttpServiceManager();
        const builder = new HttpServiceBuilder_1.HttpServiceBuilder();
        builder.buildServices(this._httpServiceManager, this._context.getHttpListenerConfigList());
    }
    initLocales() {
        GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance().init(this._context.getLocale());
    }
    initDomainConnectors() {
        const dcmb = new DomainConnectorManagerBuilder_1.DomainConnectorManagerBuilder();
        this._domainConnectorManager = dcmb.build(Kernel.VERSION, this._context, this._httpServiceManager, this._jsletManager, this._securityManager, this._jcadContext);
        this._securityManager.setDomainConnectorManager(this._domainConnectorManager);
    }
    initSecurityLayer() {
        this._securityManager = new SecurityManager_1.SecurityManager();
    }
    initJsletEngine() {
        this._jsletManager = new JsletManager_1.JsletManager();
    }
    initSingletons() {
        HttpStatusReportBuilder_1.HttpStatusReportBuilder.getInstance()
            .init(Kernel.VERSION, Kernel.CODE_NAME);
        UrlUtils_1.UrlUtils.getInstance();
    }
    initRootPath(root) {
        MappedPathUtil_1.MappedPathUtil.getInstance().init(root);
    }
    initContext() {
        this._startTime = Date.now();
        const root = process.cwd();
        this.initRootPath(root);
        const ctxBuilder = new GlassCatContextBuilder_1.GlassCatContextBuilder();
        this._context = ctxBuilder.buildContext();
        this.initLocales();
    }
    initServices() {
        this.initSingletons();
        this.initSecurityLayer();
        this.initJsletEngine();
        this.createHttpListeners();
        this.initDomainConnectors();
    }
    startServices() {
        this._httpServiceManager.startServices();
    }
    stopServices() {
        this._httpServiceManager.stopServices();
    }
    getContext() {
        return this._context;
    }
    getVersion() {
        return Kernel.VERSION;
    }
}
Kernel.VERSION = "0.0.1";
Kernel.CODE_NAME = "Korat";
exports.Kernel = Kernel;
;
