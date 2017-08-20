"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_exchange_1 = require("jec-exchange");
const FormProperties_1 = require("./FormProperties");
const GlassCatError_1 = require("../../../exceptions/GlassCatError");
const GlassCatErrorCode_1 = require("../../../exceptions/GlassCatErrorCode");
class EjpLoginStrategyConfig {
    constructor(context) {
        this._context = null;
        this._authMethod = null;
        this._formProperties = null;
        this._securedArea = null;
        this.init(context);
    }
    init(context) {
        if (!context) {
            throw new GlassCatError_1.GlassCatError(GlassCatErrorCode_1.GlassCatErrorCode.NULL_EJP_CONFIG, "context must not be null");
        }
        let authMethod = context.authMethod;
        let realm = null;
        if (authMethod) {
            this._context = context;
            this._authMethod = authMethod;
            this._formProperties = new FormProperties_1.FormProperties(context.formConfig);
            realm = context.realm;
            if (realm) {
                this._securedArea = realm.securedArea;
            }
            else {
                this._securedArea = "securedArea";
            }
        }
        else {
            this._authMethod = jec_exchange_1.AuthMethod.NONE;
        }
    }
    getAuthMethod() {
        return this._authMethod;
    }
    getFormProperties() {
        return this._formProperties;
    }
    getSecuredArea() {
        return this._securedArea;
    }
}
exports.EjpLoginStrategyConfig = EjpLoginStrategyConfig;
