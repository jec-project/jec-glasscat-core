"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_node_1 = require("jec-commons-node");
const GlassCatError_1 = require("../exceptions/GlassCatError");
const GlassCatErrorCode_1 = require("../exceptions/GlassCatErrorCode");
class GlassCatLocaleManager {
    constructor() {
        let msg = null;
        let isInstanciated = GlassCatLocaleManager.INSTANCE !== null;
        if (GlassCatLocaleManager._locked || isInstanciated) {
            if (isInstanciated && GlassCatLocaleManager.INSTANCE.isInitialized()) {
                msg = GlassCatLocaleManager.getInstance().get("errors.singleton", "GlassCatLocaleManager");
            }
            else {
                msg = "You cannot create a GlassCatLocaleManager instance; " +
                    "use getInstance() instead.";
            }
            throw new GlassCatError_1.GlassCatError(GlassCatErrorCode_1.GlassCatErrorCode.SINGLETON_ERROR, msg);
        }
        GlassCatLocaleManager._locked = true;
    }
    static getInstance() {
        if (GlassCatLocaleManager.INSTANCE === null) {
            GlassCatLocaleManager._locked = false;
            GlassCatLocaleManager.INSTANCE = new jec_commons_node_1.LocaleManagerBase();
        }
        return GlassCatLocaleManager.INSTANCE;
    }
}
GlassCatLocaleManager._locked = true;
GlassCatLocaleManager.INSTANCE = null;
exports.GlassCatLocaleManager = GlassCatLocaleManager;
