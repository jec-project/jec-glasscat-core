"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractRealmConnector {
    constructor() {
        this.__securityContext = null;
        this.__userHashModule = null;
    }
    extractRoles(roles) {
        const result = new Array();
        let len = roles.length;
        let role = null;
        let roleName = null;
        while (len--) {
            roleName = roles[len];
            role = this.__securityContext.getSecurityRole(roleName);
            if (role)
                result.push(role);
            else
                console.log("invalid role: " + roleName);
        }
        return result;
    }
    authenticate(credentials, success, error) {
        error(null);
    }
    setSecurityContext(securityContext) {
        this.__securityContext = securityContext;
    }
    setUserHashModule(userHashModule) {
        this.__userHashModule = userHashModule;
    }
    getUserHashModule() {
        return this.__userHashModule;
    }
}
exports.AbstractRealmConnector = AbstractRealmConnector;
