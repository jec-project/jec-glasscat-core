"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DomainRequestError {
    constructor() {
        this.statusCode = null;
        this.detailsCode = "httpErrors.error.description";
        this.message = null;
    }
}
exports.DomainRequestError = DomainRequestError;
