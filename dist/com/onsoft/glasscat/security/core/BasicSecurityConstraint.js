"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UrlPatternBuilder_1 = require("../../util/url/UrlPatternBuilder");
const GlassCatError_1 = require("../../exceptions/GlassCatError");
const GlassCatErrorCode_1 = require("../../exceptions/GlassCatErrorCode");
class BasicSecurityConstraint {
    constructor(context) {
        this._name = null;
        this._errorUrl = null;
        this._urlPattern = null;
        this._roles = null;
        this.init(context);
    }
    init(context) {
        if (!context) {
            throw new GlassCatError_1.GlassCatError(GlassCatErrorCode_1.GlassCatErrorCode.INVALID_SECURITY_CONTEXT);
        }
        this._name = context.name;
        this._errorUrl = context.errorUrl;
        let urlPatternBuilder = new UrlPatternBuilder_1.UrlPatternBuilder();
        this._urlPattern = urlPatternBuilder.build(context.urlPattern);
        let roles = context.roles;
        let len = roles.length;
        this._roles = new Map();
        while (len--) {
            this._roles.set(roles[len], true);
        }
    }
    getName() {
        return this._name;
    }
    getUrlPattern() {
        return this._urlPattern;
    }
    hasRole(role) {
        return this._roles.has(role);
    }
    getErrorUrl() {
        return this._errorUrl;
    }
}
exports.BasicSecurityConstraint = BasicSecurityConstraint;
