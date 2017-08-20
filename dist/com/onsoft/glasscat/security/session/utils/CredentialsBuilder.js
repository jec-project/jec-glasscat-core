"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicCredentials_1 = require("../BasicCredentials");
class CredentialsBuilder {
    constructor() { }
    build(login, password) {
        let crd = new BasicCredentials_1.BasicCredentials();
        crd.login = login;
        crd.password = password;
        return crd;
    }
}
exports.CredentialsBuilder = CredentialsBuilder;
