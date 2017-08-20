"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const BootstrapConnector_1 = require("./connectors/BootstrapConnector");
const BootstrapDecorator_1 = require("./decorators/BootstrapDecorator");
const GlassCatError_1 = require("../../exceptions/GlassCatError");
const GlassCatErrorCode_1 = require("../../exceptions/GlassCatErrorCode");
class BootstrapContextManager {
    constructor() {
        this._jcadContext = null;
    }
    initContext(jcadReference, decoratorClass) {
        let ctxManager = jec_commons_1.JcadContextManager.getInstance();
        let connManager = jec_commons_1.DecoratorConnectorManager.getInstance();
        let decorator = new decoratorClass();
        let connector = new BootstrapConnector_1.BootstrapConnector(jcadReference, decorator);
        ctxManager.addContext(jcadReference, this._jcadContext);
        connManager.addConnector(connector, this._jcadContext);
    }
    removeContext(jcadReference) {
        let ctxManager = jec_commons_1.JcadContextManager.getInstance();
        let connManager = jec_commons_1.DecoratorConnectorManager.getInstance();
        connManager.removeConnector(jcadReference, this._jcadContext);
        ctxManager.removeContext(jcadReference);
    }
    createContext(jcadContext) {
        if (!jcadContext) {
            throw new GlassCatError_1.GlassCatError(GlassCatErrorCode_1.GlassCatErrorCode.INVALID_CONTEXT, "Context must not be null.");
        }
        this._jcadContext = jcadContext;
        this.initContext(jec_commons_1.BootstrapConnectorRefs.BOOTSTRAP_CONNECTOR_REF, BootstrapDecorator_1.BootstrapDecorator);
    }
    deleteContext() {
        this.removeContext(jec_commons_1.BootstrapConnectorRefs.BOOTSTRAP_CONNECTOR_REF);
        this._jcadContext = null;
    }
    hasContext(jcadReference) {
        return jec_commons_1.JcadContextManager.getInstance().hasContext(jcadReference);
    }
}
exports.BootstrapContextManager = BootstrapContextManager;
