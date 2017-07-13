"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Domain_1 = require("../Domain");
const DomainConnectorConfig_1 = require("../DomainConnectorConfig");
class DomainBuilder {
    constructor() { }
    buildDomainConnector(connector) {
        let cfg = new DomainConnectorConfig_1.DomainConnectorConfig();
        cfg.type = connector.type;
        cfg.server = connector.server;
        return cfg;
    }
    buildDomain(config) {
        let domain = new Domain_1.Domain();
        domain.name = config.name;
        domain.host = config.host;
        domain.target = config.target;
        domain.connector = this.buildDomainConnector(config.connector);
        return domain;
    }
}
exports.DomainBuilder = DomainBuilder;
;
