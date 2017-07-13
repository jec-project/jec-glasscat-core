"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GlassCatError_1 = require("../../../exceptions/GlassCatError");
const GlassCatErrorCode_1 = require("../../../exceptions/GlassCatErrorCode");
class FormProperties {
    constructor(context) {
        this._loginUrl = null;
        this._errorUrl = null;
        this.init(context);
    }
    init(context) {
        if (!context) {
            throw new GlassCatError_1.GlassCatError(GlassCatErrorCode_1.GlassCatErrorCode.NULL_EJP_CONFIG, "context must not be null");
        }
        this._loginUrl = context.loginUrl;
        this._errorUrl = context.errorUrl;
    }
    getLoginUrl() {
        return this._loginUrl;
    }
    getErrorUrl() {
        return this._errorUrl;
    }
}
exports.FormProperties = FormProperties;
