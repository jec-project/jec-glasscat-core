/*!
 * JEC GlassCat Core Node Module
 * Copyright(c) 2017 Pascal ECHEMANN
 * Apache 2.0 Licensed
 * This is a part of the JEC Projects: <https://github.com/pechemann/JEC>
 */

declare module "jec-glasscat-core" {

export class BootstrapConfig {    constructor();    glasscat: GlasscatConfig;    config: ToolsConfig;}export class GlasscatConfig {    constructor();    version: string;    locale: string;}export class HttpConfig {    constructor();    listeners: HttpListenerConfig[];}export class HttpListenerConfig {    constructor();    monitoring: HttpMonitoringConfig;    id: string;    port: number;    address: string;    secured: boolean;    server: string;    sslPath: string;    domain: string;    securityConfig: string[];}export class HttpMonitoringConfig {    constructor();    enabled: boolean;    factory: string;}export class LoggerFactoryConfig {    constructor();    name: string;    factory: string;    logLevel: string;}export class LoggersConfig {    constructor();    logLevel: string;    factories: LoggerFactoryConfig[];}export class SecurityConfig {    constructor();    headerModules: any[];}export class ToolsConfig {    constructor();    loggers: LoggersConfig;    http: HttpConfig;    security: SecurityConfig;    errorPage: string;}export class BootstrapConfigParser {    constructor();    private parseGlasscatConfig(bootstrap);    private parseToolsConfig(bootstrap);    private parserHttpListener(httpListener);    private parseHttpMonitoring(monitoring);    private parseHttpConfig(httpData);    private parseLoggersConfig(loggers);    private parseSecurityConfig(security);    parse(bootstrap: any): BootstrapConfig;}
}