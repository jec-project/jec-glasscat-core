"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpServiceFactory_1 = require("./HttpServiceFactory");
class HttpServiceBuilder {
    constructor() { }
    buildServices(httpServiceManager, httpListenerConfigList) {
        const factory = new HttpServiceFactory_1.HttpServiceFactory();
        let len = httpListenerConfigList.length;
        let service = null;
        while (len--) {
            service = factory.build(httpListenerConfigList[len]);
            httpServiceManager.addService(service);
        }
    }
}
exports.HttpServiceBuilder = HttpServiceBuilder;
;
