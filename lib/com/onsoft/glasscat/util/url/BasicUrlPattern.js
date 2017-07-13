"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BasicUrlPattern {
    constructor() {
        this.pattern = null;
        this.strict = true;
        this.baseUrl = null;
        this.baseUrlLength = 0;
    }
    toString() {
        return "[Object::BasicUrlPattern: pattern=" + this.pattern +
            ", baseUrl=" + this.baseUrl + ", strict=" + this.strict +
            ", baseUrlLength=" + this.baseUrlLength + "]";
    }
}
exports.BasicUrlPattern = BasicUrlPattern;
