"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BasicAuthenticationError {
    constructor(statusCode) {
        this._statusCode = 0;
        this._statusCode = statusCode;
    }
    getStatusCode() {
        return this._statusCode;
    }
}
exports.BasicAuthenticationError = BasicAuthenticationError;
