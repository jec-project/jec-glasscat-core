"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DomainConnectorConfigImpl_1 = require("../DomainConnectorConfigImpl");
const DomainImpl_1 = require("../DomainImpl");
class DomainBuilder {
    constructor() { }
    buildDomainConnector(connector) {
        const cfg = new DomainConnectorConfigImpl_1.DomainConnectorConfigImpl();
        cfg.type = connector.type;
        cfg.server = connector.server;
        return cfg;
    }
    buildDomain(config) {
        const domain = new DomainImpl_1.DomainImpl();
        domain.name = config.name;
        domain.host = config.host;
        domain.target = config.target;
        domain.connector = this.buildDomainConnector(config.connector);
        return domain;
    }
}
exports.DomainBuilder = DomainBuilder;
;
