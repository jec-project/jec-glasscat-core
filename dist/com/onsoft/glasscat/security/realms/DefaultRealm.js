"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_exchange_1 = require("jec-exchange");
const AdminFileRealmConnector_1 = require("./connectors/AdminFileRealmConnector");
class DefaultRealm {
    constructor(config) {
        this._realmType = null;
        this._realmConnector = null;
        this.init(config);
    }
    init(config) {
        this._realmType = jec_exchange_1.RealmType.ADMIN_FILE;
        if (this._realmType === jec_exchange_1.RealmType.FILE) {
            this._realmConnector = new AdminFileRealmConnector_1.AdminFileRealmConnector();
        }
        else if (this._realmType === jec_exchange_1.RealmType.ADMIN_FILE) {
            this._realmConnector = new AdminFileRealmConnector_1.AdminFileRealmConnector();
        }
    }
    getRealmType() {
        return this._realmType;
    }
    getRealmConnector() {
        return this._realmConnector;
    }
    authenticate(credentials, success, error) {
        this._realmConnector.authenticate(credentials, success, error);
    }
}
exports.DefaultRealm = DefaultRealm;
