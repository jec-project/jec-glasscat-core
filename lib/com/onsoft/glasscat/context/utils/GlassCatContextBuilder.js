"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GlassCatContext_1 = require("../GlassCatContext");
const GlassCatConfigLoader_1 = require("./GlassCatConfigLoader");
const BootstrapConfigParser_1 = require("../core/utils/BootstrapConfigParser");
class GlassCatContextBuilder {
    constructor() { }
    buildContext() {
        let loader = new GlassCatConfigLoader_1.GlassCatConfigLoader();
        let parser = new BootstrapConfigParser_1.BootstrapConfigParser();
        let config = loader.loadSync();
        let bootstrap = parser.parse(config);
        let ctx = new GlassCatContext_1.GlassCatContext(bootstrap);
        return ctx;
    }
}
exports.GlassCatContextBuilder = GlassCatContextBuilder;
;
