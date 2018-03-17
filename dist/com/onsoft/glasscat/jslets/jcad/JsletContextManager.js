"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const jec_exchange_1 = require("jec-exchange");
const JsletConnector_1 = require("./connectors/JsletConnector");
const WebJsletDecorator_1 = require("./decorators/WebJsletDecorator");
const GlassCatError_1 = require("../../exceptions/GlassCatError");
const GlassCatErrorCode_1 = require("../../exceptions/GlassCatErrorCode");
class JsletContextManager {
    constructor() {
        this._jcadContext = null;
    }
    initContext(jcadReference, decoratorClass) {
        const ctxManager = jec_commons_1.JcadContextManager.getInstance();
        const connManager = jec_commons_1.DecoratorConnectorManager.getInstance();
        const decorator = new decoratorClass();
        const connector = new JsletConnector_1.JsletConnector(jcadReference, decorator);
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
        this.initContext(jec_exchange_1.JsletConnectorRefs.WEB_JSLET_CONNECTOR_REF, WebJsletDecorator_1.WebJsletDecorator);
    }
    deleteContext() {
        this.removeContext(jec_exchange_1.JsletConnectorRefs.WEB_JSLET_CONNECTOR_REF);
        this._jcadContext = null;
    }
    hasContext(jcadReference) {
        return jec_commons_1.JcadContextManager.getInstance().hasContext(jcadReference);
    }
}
exports.JsletContextManager = JsletContextManager;
