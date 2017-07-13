"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GlassCatError extends Error {
    constructor(code, message) {
        super(message);
        this._code = -1;
        this.initObj(code);
    }
    initObj(code) {
        this._code = code;
    }
    getCode() {
        return this._code;
    }
}
exports.GlassCatError = GlassCatError;
