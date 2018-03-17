"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UrlPatternBuilder_1 = require("../../util/url/UrlPatternBuilder");
const GlassCatError_1 = require("../../exceptions/GlassCatError");
const GlassCatErrorCode_1 = require("../../exceptions/GlassCatErrorCode");
class BasicStaticResources {
    constructor(context) {
        this._urlPattern = null;
        this.init(context);
    }
    init(context) {
        if (!context) {
            throw new GlassCatError_1.GlassCatError(GlassCatErrorCode_1.GlassCatErrorCode.INVALID_SECURITY_CONTEXT);
        }
        const builder = new UrlPatternBuilder_1.UrlPatternBuilder();
        this._urlPattern = builder.build(context.urlPattern);
    }
    getUrlPattern() {
        return this._urlPattern;
    }
}
exports.BasicStaticResources = BasicStaticResources;
