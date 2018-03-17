"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BootstrapScriptSorter {
    constructor() { }
    sortFunction(obj1, obj2) {
        const a = obj1.__priority;
        const b = obj2.__priority;
        if (a === null || a === undefined && b === null || b === undefined)
            return 0;
        else if (a === null || a === undefined)
            return -1;
        else if (b === null || b === undefined)
            return 1;
        else if (a > b)
            return -1;
        else if (a < b)
            return 1;
        return 0;
    }
    sortCollection(bootstrapCollection) {
        bootstrapCollection.sort(this.sortFunction);
    }
}
exports.BootstrapScriptSorter = BootstrapScriptSorter;
