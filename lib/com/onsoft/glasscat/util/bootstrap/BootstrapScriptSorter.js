"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BootstrapScriptSorter {
    constructor() { }
    sortFunction(obj1, obj2) {
        let a = obj1.priority;
        let b = obj2.priority;
        if (a === undefined && b === undefined)
            return 0;
        else if (a === undefined)
            return -1;
        else if (b === undefined)
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
