"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpListenerFactory_1 = require("../listeners/HttpListenerFactory");
const DefaultHttpService_1 = require("../DefaultHttpService");
class HttpServiceFactory {
    constructor() { }
    build(config) {
        let factory = new HttpListenerFactory_1.HttpListenerFactory();
        let listener = factory.build(config);
        let service = new DefaultHttpService_1.DefaultHttpService(listener);
        return service;
    }
}
exports.HttpServiceFactory = HttpServiceFactory;
