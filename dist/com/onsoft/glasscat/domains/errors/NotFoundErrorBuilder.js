"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const DomainRequestError_1 = require("./DomainRequestError");
class NotFoundErrorBuilder {
    constructor() { }
    build(message) {
        let error = new DomainRequestError_1.DomainRequestError();
        error.statusCode = jec_commons_1.HttpStatusCode.NOT_FOUND;
        error.detailsCode = "httpErrors.notFound";
        error.message = message;
        return error;
    }
}
exports.NotFoundErrorBuilder = NotFoundErrorBuilder;
