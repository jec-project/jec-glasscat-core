"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DomainState_1 = require("../../../domains/containers/DomainState");
class HttpLocalProperties {
    constructor() {
        this.connector = null;
        this.contextRootData = null;
        this.containerState = DomainState_1.DomainState.STATELESS;
        this.sessionId = null;
        this.transactionFails = false;
        this.isStatic = false;
        this.trimmedUrl = null;
        this.redirectUrl = null;
        this.contextRootRef = null;
    }
}
exports.HttpLocalProperties = HttpLocalProperties;
