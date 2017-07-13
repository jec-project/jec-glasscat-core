"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ContextRootData {
    constructor() {
        this.containsNestedResource = false;
        this.needsRedirection = false;
        this.newPath = null;
        this.contextRoot = null;
    }
    ;
    reset() {
        this.needsRedirection = this.containsNestedResource = false;
        this.newPath = null;
        this.contextRoot = null;
    }
    toString() {
        return "[Object::ContextRootData: contextRoot=" + this.contextRoot +
            ", needsRedirection=" + this.needsRedirection + ", newPath=" +
            this.newPath + ", containsNestedResource=" +
            this.containsNestedResource + "]";
    }
}
exports.ContextRootData = ContextRootData;
