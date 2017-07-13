"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DomainConfig_1 = require("../DomainConfig");
const DomainBuilder_1 = require("./DomainBuilder");
class DomainConfigParser {
    constructor() { }
    parseDomains(domains) {
        let builder = new DomainBuilder_1.DomainBuilder();
        let cfg = new Array();
        let domain = null;
        let len = -1;
        if (domains) {
            len = domains.length;
            while (len--) {
                domain = builder.buildDomain(domains[len]);
                cfg.push(domain);
            }
        }
        return cfg;
    }
    parse(manifest) {
        let cfg = new DomainConfig_1.DomainConfig();
        cfg.domains = this.parseDomains(manifest.domains);
        return cfg;
    }
}
exports.DomainConfigParser = DomainConfigParser;
