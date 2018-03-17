"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GlassCatLocaleManager_1 = require("../../i18n/GlassCatLocaleManager");
const GlassCatError_1 = require("../../exceptions/GlassCatError");
const GlassCatErrorCode_1 = require("../../exceptions/GlassCatErrorCode");
class UrlUtils {
    constructor() {
        if (UrlUtils._locked || UrlUtils.INSTANCE) {
            const msg = GlassCatLocaleManager_1.GlassCatLocaleManager.getInstance().get("errors.singleton", "UrlUtils");
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
