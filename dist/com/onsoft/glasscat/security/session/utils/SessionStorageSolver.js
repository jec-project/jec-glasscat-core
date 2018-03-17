"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LocalSessionStorage_1 = require("../connectors/LocalSessionStorage");
const jec_exchange_1 = require("jec-exchange");
class SessionStorageSolver {
    constructor() { }
    getSessionStorage(config) {
        const storage = config.storage;
        let sessionStorage = null;
        if (storage) {
            switch (storage) {
                case jec_exchange_1.SessionStorageType.DISTANT:
                    break;
                case jec_exchange_1.SessionStorageType.CUSTOM:
                    break;
                case jec_exchange_1.SessionStorageType.LOCAL:
                default:
                    sessionStorage = new LocalSessionStorage_1.LocalSessionStorage();
            }
        }
        else
            sessionStorage = new LocalSessionStorage_1.LocalSessionStorage();
        return sessionStorage;
    }
}
exports.SessionStorageSolver = SessionStorageSolver;
