"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LocaleManager_1 = require("../../i18n/LocaleManager");
const GlassCatError_1 = require("../../exceptions/GlassCatError");
const GlassCatErrorCode_1 = require("../../exceptions/GlassCatErrorCode");
class UrlUtils {
    constructor() {
        if (UrlUtils._locked || UrlUtils.INSTANCE) {
            let msg = LocaleManager_1.LocaleManager.getInstance().get("errors.singleton", "UrlUtils");
            throw new GlassCatError_1.GlassCatError(GlassCatErrorCode_1.GlassCatErrorCode.SINGLETON_ERROR, msg);
        }
        UrlUtils._locked = true;
    }
    static getInstance() {
        if (UrlUtils.INSTANCE === null) {
            UrlUtils._locked = false;
            UrlUtils.INSTANCE = new UrlUtils();
        }
        return UrlUtils.INSTANCE;
    }
    trimContextRoot(urlPath, contextRootRef) {
        let trimmed = urlPath;
        if (trimmed.indexOf(contextRootRef) === 0) {
            trimmed = trimmed.substr(contextRootRef.length + 1);
        }
        return trimmed;
    }
}
UrlUtils._locked = true;
UrlUtils.INSTANCE = null;
exports.UrlUtils = UrlUtils;
