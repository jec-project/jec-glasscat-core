"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigLoaderBase_1 = require("../../../util/loaders/ConfigLoaderBase");
class EjpConfigLoader extends ConfigLoaderBase_1.ConfigLoaderBase {
    constructor() {
        super();
    }
    loadSync(projectPath) {
        return super.loadConfigSync(projectPath + EjpConfigLoader.MANIFEST_PATH);
    }
    load(projectPath, success, error) {
        super.loadConfig(projectPath + EjpConfigLoader.MANIFEST_PATH, success, error);
    }
}
EjpConfigLoader.MANIFEST_PATH = "/JEC-INF/web.json";
exports.EjpConfigLoader = EjpConfigLoader;
