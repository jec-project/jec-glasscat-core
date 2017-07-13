"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EjpConfigLoader_1 = require("../../context/ejp/utils/EjpConfigLoader");
const EjpConfigParser_1 = require("../../context/ejp/utils/EjpConfigParser");
const moment = require("moment");
class AbstractDomainConnector {
    constructor() {
        this.__version = null;
        this.__name = null;
        this.__target = null;
        this.__contextRoot = null;
        this.__host = null;
        this.__config = null;
        this.__server = null;
        this.__container = null;
        this._startDate = null;
        this._jcadContext = null;
    }
    getServerInfo() {
        return "GlassCat/" + this.__version;
    }
    init(version, data, jsletManager, jcadContext) {
        this._startDate = moment().format("MM/DD/YY HH:mm:ss");
        this.__version = version;
        this.__name = data.name;
        this.__target = data.target;
        this.__server = data.connector.server;
        this.__host = data.host;
        this._jcadContext = jcadContext;
        let loader = new EjpConfigLoader_1.EjpConfigLoader();
        let parser = new EjpConfigParser_1.EjpConfigParser();
        let configFile = loader.loadSync(this.__target);
        this.__config = parser.parse(configFile);
        this.__contextRoot = this.__config.webapp.contextRoot;
    }
    getName() {
        return this.__name;
    }
    getTarget() {
        return this.__target;
    }
    getContextRoot() {
        return this.__contextRoot;
    }
    getHost() {
        return this.__host;
    }
    getServer() {
        return this.__server;
    }
    getContainer() {
        return this.__container;
    }
    getConfig() {
        return this.__config;
    }
    getJcadContext() {
        return this._jcadContext;
    }
    getStatusInfo() {
        let msg = "application started at " + this._startDate +
            ", on server '" + this.__server + "'.";
        let status = {
            title: this.__name,
            type: "Project status",
            message: "test",
            description: msg,
            serverInfo: this.getServerInfo()
        };
        return status;
    }
}
exports.AbstractDomainConnector = AbstractDomainConnector;
