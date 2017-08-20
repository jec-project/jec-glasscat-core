"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigLoaderBase_1 = require("../../util/loaders/ConfigLoaderBase");
class GlassCatConfigLoader extends ConfigLoaderBase_1.ConfigLoaderBase {
    constructor() {
        super();
    }
    loadSync() {
        return super.loadConfigSync(GlassCatConfigLoader.BOOTSTRAP_FILE_PATH);
    }
    load(success, error) {
        super.loadConfig(GlassCatConfigLoader.BOOTSTRAP_FILE_PATH, success, error);
    }
}
GlassCatConfigLoader.BOOTSTRAP_FILE_PATH = "${root}/public/cfg/bootstrap.json";
exports.GlassCatConfigLoader = GlassCatConfigLoader;
;
