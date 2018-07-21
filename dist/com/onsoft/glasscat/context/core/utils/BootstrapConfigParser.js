"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ToolsConfigImpl_1 = require("../ToolsConfigImpl");
const GlasscatConfigImpl_1 = require("../GlasscatConfigImpl");
const HttpListenerConfigImpl_1 = require("../HttpListenerConfigImpl");
const HttpMonitoringConfigImpl_1 = require("../HttpMonitoringConfigImpl");
const HttpConfigImpl_1 = require("../HttpConfigImpl");
const LoggersConfigImpl_1 = require("../LoggersConfigImpl");
const SecurityConfigImpl_1 = require("../SecurityConfigImpl");
const BootstrapConfigImpl_1 = require("../BootstrapConfigImpl");
const LoggerFactoryConfigImpl_1 = require("../LoggerFactoryConfigImpl");
class BootstrapConfigParser {
    constructor() { }
    parseGlasscatConfig(bootstrap) {
        const cfg = new GlasscatConfigImpl_1.GlasscatConfigImpl();
        const glasscat = bootstrap.glasscat;
        cfg.version = glasscat.version;
        cfg.locale = glasscat.locale;
        return cfg;
    }
    parseToolsConfig(bootstrap) {
        const cfg = new ToolsConfigImpl_1.ToolsConfigImpl();
        const config = bootstrap.config;
        cfg.loggers = this.parseLoggersConfig(config.loggers);
        cfg.http = this.parseHttpConfig(config.http);
        cfg.security = this.parseSecurityConfig(config.security);
        cfg.errorPage = config.errorPage;
        return cfg;
    }
    parserHttpListener(httpListener) {
        const listener = new HttpListenerConfigImpl_1.HttpListenerConfigImpl();
        listener.id = httpListener.id;
        listener.address = httpListener.address;
        listener.domain = httpListener.domain;
        listener.port = httpListener.port;
        listener.secured = httpListener.secured;
        listener.sslPath = httpListener.sslPath;
        listener.server = httpListener.server;
        listener.monitoring = this.parseHttpMonitoring(httpListener.monitoring);
        return listener;
    }
    parseHttpMonitoring(monitoring) {
        const cfg = new HttpMonitoringConfigImpl_1.HttpMonitoringConfigImpl();
        if (monitoring) {
            cfg.enabled = monitoring.enabled;
            cfg.factory = monitoring.factory;
        }
        return cfg;
    }
    parseHttpConfig(httpData) {
        const cfg = new HttpConfigImpl_1.HttpConfigImpl();
        const listeners = new Array();
        const httpListeners = httpData.listeners;
        let listener = null;
        let len = -1;
        if (httpListeners) {
            len = httpListeners.length;
            while (len--) {
                listener = this.parserHttpListener(httpListeners[len]);
                listeners.push(listener);
            }
        }
        cfg.listeners = listeners;
        return cfg;
    }
    parseLoggersConfig(loggers) {
        const cfg = new LoggersConfigImpl_1.LoggersConfigImpl();
        const factories = loggers.factories;
        let rawFactory = null;
        let factory = null;
        let len = -1;
        cfg.logLevel = loggers.logLevel;
        if (factories) {
            cfg.factories = new Array();
            len = factories.length;
            while (len--) {
                factory = new LoggerFactoryConfigImpl_1.LoggerFactoryConfigImpl();
                rawFactory = factories[len];
                factory.name = rawFactory.name;
                factory.logLevel = rawFactory.logLevel;
                factory.factory = rawFactory.factory;
                cfg.factories.push(factory);
            }
        }
        return cfg;
    }
    parseSecurityConfig(security) {
        const cfg = new SecurityConfigImpl_1.SecurityConfigImpl();
        return cfg;
    }
    parse(bootstrap) {
        const cfg = new BootstrapConfigImpl_1.BootstrapConfigImpl();
        cfg.glasscat = this.parseGlasscatConfig(bootstrap);
        cfg.config = this.parseToolsConfig(bootstrap);
        return cfg;
    }
}
exports.BootstrapConfigParser = BootstrapConfigParser;
