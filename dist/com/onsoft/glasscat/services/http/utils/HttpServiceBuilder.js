"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpServiceFactory_1 = require("./HttpServiceFactory");
class HttpServiceBuilder {
    constructor() { }
    buildServices(httpServiceManager, httpListenerConfigList) {
        let len = httpListenerConfigList.length;
        let factory = new HttpServiceFactory_1.HttpServiceFactory();
        while (len--) {
            let service = factory.build(httpListenerConfigList[len]);
            httpServiceManager.addService(service);
        }
    }
}
exports.HttpServiceBuilder = HttpServiceBuilder;
;
