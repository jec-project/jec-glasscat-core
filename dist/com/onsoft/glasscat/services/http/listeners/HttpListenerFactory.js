"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DefaultHttpListener_1 = require("./DefaultHttpListener");
const GlassCatError_1 = require("../../../exceptions/GlassCatError");
const GlassCatErrorCode_1 = require("../../../exceptions/GlassCatErrorCode");
class HttpListenerFactory {
    constructor() { }
    build(config) {
        if (!config) {
            throw new GlassCatError_1.GlassCatError(GlassCatErrorCode_1.GlassCatErrorCode.INVALID_CONTEXT, "Config must not be null.");
        }
        let listener = new DefaultHttpListener_1.DefaultHttpListener(config);
        return listener;
    }
}
exports.HttpListenerFactory = HttpListenerFactory;
;
