"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigLoaderBase_1 = require("../../../util/loaders/ConfigLoaderBase");
class DomainConfigLoader extends ConfigLoaderBase_1.ConfigLoaderBase {
    constructor() {
        super();
    }
    loadSync() {
        return super.loadConfigSync(DomainConfigLoader.DOMAIN_FILE_PATH);
    }
    load(success, error) {
        super.loadConfig(DomainConfigLoader.DOMAIN_FILE_PATH, success, error);
    }
}
DomainConfigLoader.DOMAIN_FILE_PATH = "${root}/public/domains/manifest.json";
exports.DomainConfigLoader = DomainConfigLoader;
;
