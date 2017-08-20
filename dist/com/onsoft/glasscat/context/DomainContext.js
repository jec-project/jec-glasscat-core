"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DomainContext {
    constructor() {
        this._map = null;
        this.init();
    }
    init() {
        this._map = new Map();
    }
    addDomain(domain) {
        this._map.set(domain.name, domain);
    }
    getDomainList() {
        let list = new Array();
        this._map.forEach((value) => { list.push(value); });
        return list;
    }
}
exports.DomainContext = DomainContext;
