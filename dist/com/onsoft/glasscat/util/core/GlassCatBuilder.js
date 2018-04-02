"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GlassCat_1 = require("../../core/GlassCat");
class GlassCatBuilder {
    constructor() { }
    build(config) {
        return new GlassCat_1.GlassCat(config);
    }
}
exports.GlassCatBuilder = GlassCatBuilder;
