"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DomainConnectorManager_1 = require("../../../core/DomainConnectorManager");
const DomainConnectorBuilder_1 = require("./DomainConnectorBuilder");
const MappedPathUtil_1 = require("../../../util/paths/MappedPathUtil");
const DomainConfigLoader_1 = require("../../../context/domains/utils/DomainConfigLoader");
class DomainConnectorManagerBuilder {
    constructor() { }
    build(version, context, httpManager, jsletManager, securityManager, jcadContext) {
        const manager = new DomainConnectorManager_1.DomainConnectorManager();
        const domainConfigLoader = new DomainConfigLoader_1.DomainConfigLoader();
        const json = domainConfigLoader.loadSync();
        const dcBuilder = new DomainConnectorBuilder_1.DomainConnectorBuilder();
        const domains = json.domains;
        let len = domains.length;
        let connector = null;
        let httpService = null;
        let data = null;
        manager.setErrorPage(context.getErrorPage());
        while (len--) {
            data = domains[len];
            data.target = MappedPathUtil_1.MappedPathUtil.getInstance().resolve(data.target);
            connector = dcBuilder.build(version, data, jsletManager, jcadContext);
            httpService = httpManager.getService(connector.getServer());
            manager.addConnector(connector, httpService.getHttpListener());
        }
        httpManager.initManagers(manager, securityManager);
        return manager;
    }
}
exports.DomainConnectorManagerBuilder = DomainConnectorManagerBuilder;
