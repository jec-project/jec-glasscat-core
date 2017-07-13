"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GlassCatError_1 = require("../../../exceptions/GlassCatError");
const GlassCatErrorCode_1 = require("../../../exceptions/GlassCatErrorCode");
class DomainConfigSerializer {
    constructor() { }
    serialize(config, success, error) {
        try {
            let data = JSON.stringify(config);
            success(data);
        }
        catch (e) {
            let err = new GlassCatError_1.GlassCatError(GlassCatErrorCode_1.GlassCatErrorCode.CONFIG_SERIALIZATION_ERROR, e);
            error(err);
        }
    }
}
exports.DomainConfigSerializer = DomainConfigSerializer;
;
