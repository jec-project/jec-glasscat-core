"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpListenerFactory_1 = require("../listeners/HttpListenerFactory");
const DefaultHttpService_1 = require("../DefaultHttpService");
class HttpServiceFactory {
    constructor() { }
    build(config) {
        const factory = new HttpListenerFactory_1.HttpListenerFactory();
        const listener = factory.build(config);
        const service = new DefaultHttpService_1.DefaultHttpService(listener);
        return service;
    }
}
exports.HttpServiceFactory = HttpServiceFactory;
