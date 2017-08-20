"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BasicSecurityRole {
    constructor(name) {
        this.__name = null;
        this.initObj(name);
    }
    initObj(name) {
        this.__name = name;
    }
    getName() {
        return this.__name;
    }
}
exports.BasicSecurityRole = BasicSecurityRole;
