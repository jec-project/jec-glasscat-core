"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MappedPathUtil_1 = require("../paths/MappedPathUtil");
const LoggerManager_1 = require("../logging/LoggerManager");
const jec_commons_1 = require("jec-commons");
const GlassCatLocaleManager_1 = require("../../i18n/GlassCatLocaleManager");
const GlassCatError_1 = require("../../exceptions/GlassCatError");
const GlassCatErrorCode_1 = require("../../exceptions/GlassCatErrorCode");
class ConfigLoaderBase {
    constructor() { }
    loadConfigSync(filePath) {
        let loader = new jec_commons_1.JsonLoader();
        let path = MappedPathUtil_1.MappedPathUtil.getInstance().resolve(filePath);
        let json = null;
        let logManager = null;
        let i18n = null;
        try {
            json = loader.loadSync(path);
        }
        catch (e) {
            logManager = LoggerManager_1.LoggerManager.getInstance();
            i18n = GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance();
            if (logManager.isInitialized() && i18n.isInitialized()) {
                logManager.error(i18n.get("errors.loadingFile", e));
            }
            throw new GlassCatError_1.GlassCatError(GlassCatErrorCode_1.GlassCatErrorCode.CONFIG_LOADING_FAILURE, e);
        }
        return json;
    }
    loadConfig(filePath, success, error) {
        let loader = new jec_commons_1.JsonLoader();
        let path = MappedPathUtil_1.MappedPathUtil.getInstance().resolve(filePath);
        let logManager = null;
        let i18n = null;
        loader.load(path, success, (e) => {
            logManager = LoggerManager_1.LoggerManager.getInstance();
            i18n = GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance();
            if (logManager.isInitialized() && i18n.isInitialized()) {
                logManager.error(i18n.get("errors.loadingFile", e));
            }
            ;
            let glassCatError = new GlassCatError_1.GlassCatError(GlassCatErrorCode_1.GlassCatErrorCode.CONFIG_LOADING_FAILURE, e);
            error(glassCatError);
        });
    }
}
exports.ConfigLoaderBase = ConfigLoaderBase;
;
