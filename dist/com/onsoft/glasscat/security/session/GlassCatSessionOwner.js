"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GlassCatSessionOwner {
    constructor(id, alias, roles) {
        this._id = null;
        this._alias = null;
        this._roles = null;
        this.init(id, alias, roles);
    }
    init(id, alias, roles) {
        this._id = id;
        this._alias = alias;
        this._roles = roles;
    }
    getAlias() {
        return this._alias;
    }
    isGranted(securityConstraint) {
        let granted = false;
        let len = this._roles.length;
        let role = null;
        while (len--) {
            role = this._roles[len];
            if (securityConstraint.hasRole(role.getName())) {
                granted = true;
                break;
            }
        }
        return granted;
    }
}
exports.GlassCatSessionOwner = GlassCatSessionOwner;
