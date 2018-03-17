"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DomainContext_1 = require("../../DomainContext");
const DomainBuilder_1 = require("./DomainBuilder");
class DomainContextBuilder {
    constructor() { }
    buildContext(config) {
        const ctx = new DomainContext_1.DomainContext();
        const domains = config.domains;
        let len = -1;
        let rawDomain = null;
        let domain = null;
        let builder = null;
        if (domains) {
            builder = new DomainBuilder_1.DomainBuilder();
            len = domains.length;
            while (len--) {
                rawDomain = domains[len];
                domain = builder.buildDomain(rawDomain);
                ctx.addDomain(domain);
            }
        }
        return ctx;
    }
}
exports.DomainContextBuilder = DomainContextBuilder;
;
