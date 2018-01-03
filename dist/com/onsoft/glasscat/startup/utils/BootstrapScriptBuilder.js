"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const GlassCatError_1 = require("../../exceptions/GlassCatError");
const GlassCatErrorCode_1 = require("../../exceptions/GlassCatErrorCode");
class BootstrapScriptBuilder {
    constructor() { }
    build(path, priority = null) {
        let loader = new jec_commons_1.DefaultClassLoader();
        let script = null;
        let Contructor = null;
        try {
            Contructor = loader.loadClass(path);
            script = new Contructor();
        }
        catch (e) {
            throw new GlassCatError_1.GlassCatError(GlassCatErrorCode_1.GlassCatErrorCode.INVALID_BOOTSTRAP_CONFIG);
        }
        if (priority !== null)
            script.setPriority(priority);
        return script;
    }
}
exports.BootstrapScriptBuilder = BootstrapScriptBuilder;
