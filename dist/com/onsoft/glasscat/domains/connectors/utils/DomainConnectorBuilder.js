"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EjpConnector_1 = require("../EjpConnector");
const GlassCatError_1 = require("../../../exceptions/GlassCatError");
const GlassCatErrorCode_1 = require("../../../exceptions/GlassCatErrorCode");
class DomainConnectorBuilder {
    constructor() { }
    build(version, data, jsletManager, jcadContext) {
        const connectorRef = data.connector;
        const type = connectorRef.type;
        let connector = null;
        if (type === DomainConnectorBuilder.EJP) {
            connector = new EjpConnector_1.EjpConnector();
        }
        else {
            throw new GlassCatError_1.GlassCatError(GlassCatErrorCode_1.GlassCatErrorCode.INVALID_CONTEXT, "Invalid connector definition");
        }
        connector.init(version, data, jsletManager, jcadContext);
        return connector;
    }
}
DomainConnectorBuilder.EJP = "ejp";
exports.DomainConnectorBuilder = DomainConnectorBuilder;
