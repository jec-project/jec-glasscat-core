"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DomainBuilder_1 = require("./DomainBuilder");
const DomainConfigImpl_1 = require("../DomainConfigImpl");
class DomainConfigParser {
    constructor() { }
    parseDomains(domains) {
        const builder = new DomainBuilder_1.DomainBuilder();
        const cfg = new Array();
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
        const cfg = new DomainConfigImpl_1.DomainConfigImpl();
        cfg.domains = this.parseDomains(manifest.domains);
        return cfg;
    }
}
exports.DomainConfigParser = DomainConfigParser;
