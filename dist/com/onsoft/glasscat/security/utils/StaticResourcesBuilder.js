"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicStaticResources_1 = require("../core/BasicStaticResources");
class StaticResourcesBuilder {
    constructor() { }
    build(context) {
        const resources = new BasicStaticResources_1.BasicStaticResources(context);
        return resources;
    }
}
exports.StaticResourcesBuilder = StaticResourcesBuilder;
