"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GlassCatSessionOwner_1 = require("../GlassCatSessionOwner");
class SessionOwnerBuilder {
    constructor() { }
    build(id, alias, roles) {
        let owner = new GlassCatSessionOwner_1.GlassCatSessionOwner(id, alias, roles);
        return owner;
    }
}
exports.SessionOwnerBuilder = SessionOwnerBuilder;
