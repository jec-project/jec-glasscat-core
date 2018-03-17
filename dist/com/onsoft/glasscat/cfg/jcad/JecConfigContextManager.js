"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const JecConfigConnector_1 = require("./connectors/JecConfigConnector");
const CacheControlDecorator_1 = require("./decorators/CacheControlDecorator");
const StaticResourceDecorator_1 = require("./decorators/StaticResourceDecorator");
const GlassCatError_1 = require("../../exceptions/GlassCatError");
const GlassCatErrorCode_1 = require("../../exceptions/GlassCatErrorCode");
class JecConfigContextManager {
    constructor() {
        this._jcadContext = null;
    }
    initContext(jcadReference, decoratorClass) {
        const ctxManager = jec_commons_1.JcadContextManager.getInstance();
        const connManager = jec_commons_1.DecoratorConnectorManager.getInstance();
        const decorator = new decoratorClass();
        const connector = new JecConfigConnector_1.JecConfigConnector(jcadReference, decorator);
        ctxManager.addContext(jcadReference, this._jcadContext);
        connManager.addConnector(connector, this._jcadContext);
    }
    removeContext(jcadReference) {
        const ctxManager = jec_commons_1.JcadContextManager.getInstance();
        const connManager = jec_commons_1.DecoratorConnectorManager.getInstance();
        connManager.removeConnector(jcadReference, this._jcadContext);
        ctxManager.removeContext(jcadReference);
    }
    createContext(jcadContext) {
        if (!jcadContext) {
            throw new GlassCatError_1.GlassCatError(GlassCatErrorCode_1.GlassCatErrorCode.INVALID_CONTEXT, "Context must not be null.");
        }
        this._jcadContext = jcadContext;
        this.initContext(jec_commons_1.ConfigConnectorRefs.CACHE_CONTROL_CONNECTOR_REF, CacheControlDecorator_1.CacheControlDecorator);
        this.initContext(jec_commons_1.ConfigConnectorRefs.STATIC_RESOURCE_CONNECTOR_REF, StaticResourceDecorator_1.StaticResourceDecorator);
    }
    deleteContext() {
        this.removeContext(jec_commons_1.ConfigConnectorRefs.CACHE_CONTROL_CONNECTOR_REF);
        this.removeContext(jec_commons_1.ConfigConnectorRefs.STATIC_RESOURCE_CONNECTOR_REF);
        this._jcadContext = null;
    }
    hasContext(jcadReference) {
        return jec_commons_1.JcadContextManager.getInstance().hasContext(jcadReference);
    }
}
exports.JecConfigContextManager = JecConfigContextManager;
