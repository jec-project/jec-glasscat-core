"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicSecurityConstraint_1 = require("../core/BasicSecurityConstraint");
class SecurityConstraintBuilder {
    constructor() { }
    build(context) {
        let constraint = new BasicSecurityConstraint_1.BasicSecurityConstraint(context);
        return constraint;
    }
}
exports.SecurityConstraintBuilder = SecurityConstraintBuilder;
