"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BootstrapConfig_1 = require("../BootstrapConfig");
const GlasscatConfig_1 = require("../GlasscatConfig");
const ToolsConfig_1 = require("../ToolsConfig");
const LoggersConfig_1 = require("../LoggersConfig");
const LoggerFactoryConfig_1 = require("../LoggerFactoryConfig");
const HttpConfig_1 = require("../HttpConfig");
const HttpListenerConfig_1 = require("../HttpListenerConfig");
const HttpMonitoringConfig_1 = require("../HttpMonitoringConfig");
const SecurityConfig_1 = require("../SecurityConfig");
class BootstrapConfigParser {
    constructor() { }
    parseGlasscatConfig(bootstrap) {
        let cfg = new GlasscatConfig_1.GlasscatConfig();
        let glasscat = bootstrap.glasscat;
        cfg.version = glasscat.version;
        cfg.locale = glasscat.locale;
        return cfg;
    }
    parseToolsConfig(bootstrap) {
        let cfg = new ToolsConfig_1.ToolsConfig();
        let config = bootstrap.config;
        cfg.loggers = this.parseLoggersConfig(config.loggers);
        cfg.http = this.parseHttpConfig(config.http);
        cfg.security = this.parseSecurityConfig(config.security);
        cfg.errorPage = config.errorPage;
        return cfg;
    }
    parserHttpListener(httpListener) {
        let listener = new HttpListenerConfig_1.HttpListenerConfig();
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
        let cfg = new HttpMonitoringConfig_1.HttpMonitoringConfig();
        if (monitoring) {
            cfg.enabled = monitoring.enabled;
            cfg.factory = monitoring.factory;
        }
        return cfg;
    }
    parseHttpConfig(httpData) {
        let cfg = new HttpConfig_1.HttpConfig();
        let listeners = new Array();
        let httpListeners = httpData.listeners;
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
        let cfg = new LoggersConfig_1.LoggersConfig();
        let factories = loggers.factories;
        let rawFactory = null;
        let factory = null;
        let len = -1;
        cfg.logLevel = loggers.logLevel;
        if (factories) {
            cfg.factories = new Array();
            len = factories.length;
            while (len--) {
                factory = new LoggerFactoryConfig_1.LoggerFactoryConfig();
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
        let cfg = new SecurityConfig_1.SecurityConfig();
        return cfg;
    }
    parse(bootstrap) {
        let cfg = new BootstrapConfig_1.BootstrapConfig();
        cfg.glasscat = this.parseGlasscatConfig(bootstrap);
        cfg.config = this.parseToolsConfig(bootstrap);
        return cfg;
    }
}
exports.BootstrapConfigParser = BootstrapConfigParser;
