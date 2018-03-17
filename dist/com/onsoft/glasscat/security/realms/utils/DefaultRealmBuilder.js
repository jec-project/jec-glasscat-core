"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DefaultRealm_1 = require("../DefaultRealm");
class DefaultRealmBuilder {
    constructor() { }
    buildRealm(strategyConfig, securityContext) {
        const realm = new DefaultRealm_1.DefaultRealm(strategyConfig);
        realm.getRealmConnector().setSecurityContext(securityContext);
        return realm;
    }
}
exports.DefaultRealmBuilder = DefaultRealmBuilder;
