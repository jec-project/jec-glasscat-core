"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GlassCatContext_1 = require("../GlassCatContext");
const GlassCatConfigLoader_1 = require("./GlassCatConfigLoader");
const BootstrapConfigParser_1 = require("../core/utils/BootstrapConfigParser");
class GlassCatContextBuilder {
    constructor() { }
    buildContext() {
        const loader = new GlassCatConfigLoader_1.GlassCatConfigLoader();
        const parser = new BootstrapConfigParser_1.BootstrapConfigParser();
        const config = loader.loadSync();
        const bootstrap = parser.parse(config);
        const ctx = new GlassCatContext_1.GlassCatContext(bootstrap);
        return ctx;
    }
}
exports.GlassCatContextBuilder = GlassCatContextBuilder;
;
