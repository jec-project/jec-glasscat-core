"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractDomainConnector_1 = require("./AbstractDomainConnector");
const EjpContainer_1 = require("../containers/EjpContainer");
class EjpConnector extends AbstractDomainConnector_1.AbstractDomainConnector {
    constructor() {
        super();
    }
    init(version, data, jsletManager, jcadContext) {
        super.init(version, data, jsletManager, jcadContext);
        this.__container = new EjpContainer_1.EjpContainer();
        this.__container.init(this, jsletManager);
    }
    toString() {
        return "[DomainConnector::EjpConnector]";
    }
}
exports.EjpConnector = EjpConnector;
