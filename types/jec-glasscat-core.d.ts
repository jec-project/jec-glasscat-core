/*!
 * JEC GlassCat Core Node Module
 * Copyright(c) 2017-2018 Pascal ECHEMANN
 * Apache 2.0 Licensed
 * This is a part of the JEC projects: <http://jecproject.org>
 */

declare module "jec-glasscat-core" {

import { SourceFileInspector, FilePreProcessor, FileProperties, JcadContext,
         JecContainer, Decorator, AbstractDecoratorConnector, UrlPattern,
         AbstractLogger, LogFormatter, BootstrapParams, BootstrapContext,
         Logger, BootstrapScript, ContainerContext, CacheControlPolicy,
         Locale, LogLevelString, LogLevel, HttpConnectionType,
         HttpStatusCode } from "jec-commons";
import { LocaleManager } from "jec-commons-node";
import { JsletContext, Jslet, SessionError, HttpResponse, HttpRequest,
         WebJsletParams, SessionContext, SecurityContext, CookieOptions,
         SendFileOptions, SecurityRole, SecurityConstraint, StaticResources,
         SessionId, SessionOwner, Session, Credentials, UserHashModule,
         Realm, RealmConnector, AuthenticationError, SessionErrorType,
         AuthMethod, RealmType, SessionStorageType } from "jec-exchange";
import * as express from "express";
import * as http from "http";

export class JecConfigConnector extends AbstractDecoratorConnector {
    constructor(jcadReference: string, decorator: Decorator);
}
export class CacheControlDecorator implements Decorator {
    constructor();
    decorate(target: any, params: CacheControlPolicy): any;
}
export class StaticResourceDecorator implements Decorator {
    constructor();
    decorate(target: any, params: CacheControlPolicy): any;
}
export class JecConfigContextManager {
    constructor();
    private _jcadContext;
    private initContext(jcadReference, decoratorClass);
    private removeContext(jcadReference);
    createContext(jcadContext: JcadContext): void;
    deleteContext(): void;
    hasContext(jcadReference: string): boolean;
}
export abstract class AbstractContainerContext implements ContainerContext {
    constructor(connector: DomainConnector);
    protected __connector: DomainConnector;
    private initObj(connector);
    getStatusInfo(): any;
    getDirectoryPath(): string;
    getSourcePath(): string;
    getLogger(): Logger;
}
export class BootstrapConfig {
    constructor();
    glasscat: GlasscatConfig;
    config: ToolsConfig;
}
export class GlasscatConfig {
    constructor();
    version: string;
    locale: string;
}
export class HttpConfig {
    constructor();
    listeners: HttpListenerConfig[];
}
export class HttpListenerConfig {
    constructor();
    monitoring: HttpMonitoringConfig;
    id: string;
    port: number;
    address: string;
    secured: boolean;
    server: string;
    sslPath: string;
    domain: string;
    securityConfig: string[];
}
export class HttpMonitoringConfig {
    constructor();
    enabled: boolean;
    factory: string;
}
export class LoggerFactoryConfig {
    constructor();
    name: string;
    factory: string;
    logLevel: LogLevelString;
}
export class LoggersConfig {
    constructor();
    logLevel: LogLevelString;
    factories: LoggerFactoryConfig[];
}
export class SecurityConfig {
    constructor();
    headerModules: any[];
}
export class ToolsConfig {
    constructor();
    loggers: LoggersConfig;
    http: HttpConfig;
    security: SecurityConfig;
    errorPage: string;
}
export class BootstrapConfigParser {
    constructor();
    private parseGlasscatConfig(bootstrap);
    private parseToolsConfig(bootstrap);
    private parserHttpListener(httpListener);
    private parseHttpMonitoring(monitoring);
    private parseHttpConfig(httpData);
    private parseLoggersConfig(loggers);
    private parseSecurityConfig(security);
    parse(bootstrap: any): BootstrapConfig;
}
export class DomainContext {
    constructor();
    private _map;
    init(): void;
    addDomain(domain: Domain): void;
    getDomainList(): Domain[];
}
export class Domain {
    constructor();
    name: string;
    host: string;
    target: string;
    connector: DomainConnectorConfig;
}
export class DomainConfig {
    constructor();
    domains: Domain[];
}
export class DomainConnectorConfig {
    constructor();
    type: string;
    server: string;
}
export class DomainBuilder {
    constructor();
    private buildDomainConnector(connector);
    buildDomain(config: any): Domain;
}
export class DomainConfigLoader extends ConfigLoaderBase implements ConfigLoader {
    constructor();
    private static readonly DOMAIN_FILE_PATH;
    loadSync(): any;
    load(success: (data: any) => void, error: (err: GlassCatError) => void): void;
}
export class DomainConfigParser {
    constructor();
    private parseDomains(domains);
    parse(manifest: any): DomainConfig;
}
export class DomainConfigSerializer {
    constructor();
    serialize(config: DomainConfig, success: (data: string) => void, error: (err: GlassCatError) => void): void;
}
export class DomainConfigUpdater {
    constructor();
    private static readonly DOMAIN_FILE_PATH;
    private _serializer;
    private init();
    update(config: DomainConfig, result: (err: any) => void): void;
}
export class DomainContextBuilder {
    constructor();
    buildContext(config: any): DomainContext;
}
export class EjpBootstrapConfig {
    constructor();
    path: string;
    priority: number;
}
export class EjpConfig {
    constructor();
    webapp: EjpWebAppConfig;
}
export class EjpConstraintConfig {
    constructor();
    name: string;
    roles: string[];
    urlPattern: string;
    errorUrl: string;
}
export class EjpFormConfig {
    constructor();
    loginUrl: string;
    errorUrl: string;
}
export class EjpJsletsConfig {
    constructor();
    configFile: string;
    config: string[];
    enableAutowire: boolean;
}
export class EjpLoginConfig {
    constructor();
    authMethod: AuthMethod;
    formConfig: EjpFormConfig;
    realm: EjpRealmConfig;
}
export class EjpRealmConfig {
    constructor();
    type: RealmType;
    securedArea: string;
    connectorFactory: string;
}
export class EjpResourceMapperConfig {
    constructor();
    name: string;
    value: string;
}
export class EjpRoleConfig {
    constructor();
    name: string;
    path: string;
}
export class EjpSecurityConfig {
    constructor();
    constraints: EjpConstraintConfig[];
    roles: EjpRoleConfig[];
    staticResources: EjpStaticResourcesConfig[];
}
export class EjpSessionConfig {
    constructor();
    storage: SessionStorageType;
    errorUrl: string;
    maxAge: number;
}
export class EjpStaticResourcesConfig {
    constructor();
    urlPattern: string;
    cacheControlPolicy: CacheControlPolicy;
}
export class EjpWebAppConfig {
    constructor();
    name: string;
    description: string;
    version: string;
    author: string;
    contextRoot: string;
    state: string;
    welcomeFile: string;
    jslets: EjpJsletsConfig;
    bootstrap: EjpBootstrapConfig[];
    session: EjpSessionConfig;
    resourceMap: Array<EjpResourceMapperConfig>;
    login: EjpLoginConfig;
    security: EjpSecurityConfig;
}
export class EjpConfigLoader extends ConfigLoaderBase {
    constructor();
    static readonly MANIFEST_PATH: string;
    loadSync(projectPath: string): any;
    load(projectPath: string, success: (data: any) => void, error: (err: GlassCatError) => void): void;
}
export class EjpConfigParser {
    constructor();
    private parseWebApp(manifest);
    private parseSecurity(manifest);
    private parseStaticConfig(staticResources);
    private parseRolesConfig(roles);
    private parseConstraintsConfig(constraints);
    private parseLogin(manifest);
    private parseFormConfig(manifest);
    private parseRealm(manifest);
    private parseJslets(manifest);
    private parseBootstrapFiles(manifest);
    private parseResourceMap(manifest);
    private parseSession(manifest);
    parse(manifest: any): EjpConfig;
}
export class EjpConfigSerializer {
    constructor();
    private _validator;
    private init();
    private stringify(config, optimize);
    private optimizeWebbAppConfig(result, webapp);
    private optimizeBootstrapConfig(result, config);
    private optimizeJsletConfig(result, jsletConfig);
    private optimizeLoginConfig(result, loginConfig);
    private optimizeSessionConfig(result, sessionConfig);
    private optimizeResourceMapConfig(result, resourceMapper);
    private optimizeSecurityConfig(result, securityConfig);
    private optimizeRoles(rolesConfig);
    private optimizeConstraints(constraintsConfig);
    private optimizeStaticResources(staticResourcesConfig);
    serialize(config: EjpConfig, success: (data: string) => void, error: (err: GlassCatError) => void, optimize?: boolean): void;
}
export class EjpConfigUpdater {
    constructor();
    private _serializer;
    private init();
    update(projectPath: string, config: EjpConfig, result: (err: GlassCatError) => void, optimize?: boolean): void;
}
export class EjpConfigValidator {
    constructor();
    private printLog(message, logLevel);
    private buildErrorObj(errorCode, message);
    private doValidation(config);
    validate(config: EjpConfig, result: (err: GlassCatError) => void): void;
}
export class CacheableFile {
    constructor();
    file: FileProperties;
    sourcePath: string;
}
export class DefaultSourceFileInspector implements SourceFileInspector {
    constructor();
    private _processors;
    private _sourcePaths;
    private _connector;
    private _target;
    private _walkUtil;
    private _cache;
    private _inspectModeUtil;
    private init();
    private inspectSourcePath(sourcePath, inspectMode);
    private processFile(file);
    private notifyProcessStart(sourcePath);
    private notifyProcessComplete(sourcePath);
    private inspectCache();
    beforeProcess: Function;
    afterProcess: Function;
    setWatcher(connector: DomainConnector): void;
    getWatcher(): DomainConnector;
    addProcessor(processor: FilePreProcessor): void;
    removeProcessor(processor: FilePreProcessor): boolean;
    removeProcessors(): void;
    addSourcePath(path: string): void;
    inspect(inspectMode: number): void;
    clearCache(): void;
}
export class GlassCatContext {
    constructor(bootstrap: BootstrapConfig);
    private _bootstrap;
    private _root;
    private _errorPage;
    private _loggerContexts;
    private _logLevel;
    private initContext(bootstrap);
    private initPaths();
    private initLogLevel();
    private initLoggerFactories();
    getLoggerContexts(): LoggerContext[];
    getLogLevel(): LogLevel;
    getVersion(): string;
    getHttpListenerConfigList(): Array<HttpListenerConfig>;
    getLocale(): string;
    getErrorPage(): string;
    getRoot(): string;
}
export class LoggerContext {
    constructor();
    factory: LoggerFactory;
    name: string;
    logLevel: LogLevel;
}
export class GlassCatConfigLoader extends ConfigLoaderBase implements ConfigLoader {
    constructor();
    private static readonly BOOTSTRAP_FILE_PATH;
    loadSync(): any;
    load(success: (data: any) => void, error: (err: GlassCatError) => void): void;
}
export class GlassCatConfigUpdater {
    constructor();
    private static readonly BOOTSTRAP_FILE_PATH;
    update(config: BootstrapConfig, result: (err: any) => void): void;
}
export class GlassCatContextBuilder {
    constructor();
    buildContext(): GlassCatContext;
}
export class LoggerContextBuilder {
    constructor();
    buildContext(name: string, factory: LoggerFactory, logLevel: LogLevel): LoggerContext;
}
export class ContextValidator implements KernelValidator {
    constructor();
    validate(kernel: Kernel): void;
}
export class EnvironmentValidator implements KernelValidator {
    constructor();
    validate(kernel: Kernel): void;
}
export interface KernelValidator {
    validate(kernel: Kernel): void;
}
export class DomainConnectorManager {
    constructor();
    private _connectorMap;
    private _contextRootUtil;
    private _errorPage;
    init(): void;
    addConnector(connector: DomainConnector, listener: HttpListener): void;
    getDomainConnector(contextRoot: string): DomainConnector;
    getErrorPage(): string;
    setErrorPage(errorPage: string): void;
}
export class GlassCat {
    constructor(config: GlassCatConfig);
    private _kernel;
    private _config;
    private initObj(config);
    private runProcesses();
    private killProcesses();
    private initKernel();
    private initLogger();
    private checkConfig();
    private initServices();
    private startServices();
    start(): void;
    stop(): void;
}
export interface GlassCatConfig {
    env?: string;
}
export class HttpServiceManager {
    constructor();
    private _httpServiceMap;
    init(): void;
    initManagers(connectorManager: DomainConnectorManager, securityManager: SecurityManager): void;
    addService(service: HttpService): void;
    getService(name: string): HttpService;
    startServices(): void;
    stopServices(): void;
}
export class JsletManager {
    constructor();
    private _jsletContextMap;
    private init();
    addContext(ref: string, context: JsletContext): void;
    getContext(ref: string): JsletContext;
    getJslet(ref: string, url: string): Jslet;
}
export class Kernel {
    constructor();
    private static readonly VERSION;
    private static readonly CODE_NAME;
    private _startTime;
    private _context;
    private _httpServiceManager;
    private _domainConnectorManager;
    private _jsletManager;
    private _securityManager;
    private _jcadContext;
    private _glasscatConfig;
    private init();
    private initJcadContext();
    private createHttpListeners();
    private initLocales();
    private initDomainConnectors();
    private initSecurityLayer();
    private initJsletEngine();
    private initSingletons();
    private initRootPath(root);
    initContext(config: GlassCatConfig): void;
    initServices(): void;
    startServices(): void;
    stopServices(): void;
    getContext(): GlassCatContext;
    getVersion(): string;
}
export class SecurityManager {
    constructor();
    private _contextRootUtil;
    private _connectorManager;
    private init();
    private validateSession(session, constraint);
    private isStaticResource(crd, context, properties);
    setDomainConnectorManager(manager: DomainConnectorManager): void;
    validateTransaction(req: express.Request, res: express.Response, service: HttpService, result: (error?: AuthenticationError) => any): void;
    getHeaderSecurityParams(service: HttpService): string[];
    processSession(service: HttpService, req: express.Request, res: express.Response, result: (error?: SessionError) => any): void;
}
export class SplashScreen {
    constructor();
    displayMessage(version: string): void;
}
export class SourceMapProcessor implements FilePreProcessor {
    constructor();
    private _fileList;
    private init();
    processStart(watcher: any, sourcePath: string): void;
    process(file: FileProperties, connector: DomainConnector): void;
    processComplete(connector: DomainConnector, sourcePath: string): void;
    getGraph(): void;
}
export abstract class AbstractDomainConnector implements DomainConnector {
    constructor();
    protected __version: string;
    protected __name: string;
    protected __target: string;
    protected __contextRoot: string;
    protected __host: string;
    protected __config: EjpConfig;
    protected __server: string;
    protected __container: DomainContainer;
    private _startDate;
    private _jcadContext;
    private getServerInfo();
    init(version: string, data: any, jsletManager: JsletManager, jcadContext: JcadContext): void;
    getName(): string;
    getTarget(): string;
    getContextRoot(): string;
    getHost(): string;
    getServer(): string;
    getContainer(): DomainContainer;
    getConfig(): EjpConfig;
    getJcadContext(): JcadContext;
    getStatusInfo(): any;
}
export interface DomainConnector {
    getName(): string;
    getTarget(): string;
    init(version: string, data: any, jsletManager: JsletManager, jcadContext: JcadContext): void;
    getContextRoot(): string;
    getHost(): string;
    getServer(): string;
    getStatusInfo(): any;
    getContainer(): DomainContainer;
    getConfig(): EjpConfig;
    getJcadContext(): JcadContext;
}
export class EjpConnector extends AbstractDomainConnector {
    constructor();
    init(version: string, data: any, jsletManager: JsletManager, jcadContext: JcadContext): void;
    toString(): string;
}
export class DomainConnectorBuilder {
    constructor();
    private static readonly EJP;
    build(version: string, data: any, jsletManager: JsletManager, jcadContext: JcadContext): DomainConnector;
}
export class DomainConnectorManagerBuilder {
    constructor();
    build(version: string, context: GlassCatContext, httpManager: HttpServiceManager, jsletManager: JsletManager, securityManager: SecurityManager, jcadContext: JcadContext): DomainConnectorManager;
}
export interface DomainContainer extends JecContainer {
    init(connector: DomainConnector, jsletManager: JsletManager): void;
    getBootstrapContext(): BootstrapContext;
    getJsletContext(): JsletContext;
    getLoginStrategy(): LoginStrategy;
    getSourceFileInspector(): SourceFileInspector;
    process(properties: HttpLocalProperties, req: HttpRequest, res: HttpResponse, result: (error?: DomainRequestError) => any): void;
    getState(): string;
    getMappedResource(name: string): string;
}
export class DomainState {
    static readonly STATELESS: string;
    static readonly STATEFUL: string;
}
export class EjpContainer implements DomainContainer {
    constructor();
    private _connector;
    private _jsletManager;
    private _jsletContext;
    private _bootstrapContext;
    private _contextRoot;
    private _webapp;
    private _src;
    private _welcomeFile;
    private _state;
    private _locale;
    private _resourceMap;
    private _sourceFileInspector;
    private _templateProcessor;
    private _loginStrategy;
    private _jsletContextManager;
    private _jdiContextManager;
    private _bootstrapContextManager;
    private _notFoundErrorBuilder;
    private _jdiProcessor;
    private initConfig(config);
    private createLoginStrategy(config);
    private initResourceMap(config);
    private initLoginStrategy();
    private initState(config);
    private initBootstrapScripts(config);
    private initJsletAutowireProcessor(jsletsConfig);
    private initJdiEngine();
    private initSessionContext(config);
    private initSecurityContext(config);
    private initSourceFileInspector();
    private initJecContextManagers();
    private deleteJecContextManagers();
    private initBootstrapContextManager();
    private deleteBootstrapContextManager();
    init(connector: DomainConnector, jsletManager: JsletManager): void;
    getJsletContext(): JsletContext;
    getBootstrapContext(): BootstrapContext;
    getLoginStrategy(): LoginStrategy;
    getSourceFileInspector(): SourceFileInspector;
    getLogger(): Logger;
    process(properties: HttpLocalProperties, req: HttpRequest, res: HttpResponse, result: (error?: DomainRequestError) => any): void;
    getState(): string;
    getLocale(): Locale;
    toString(): string;
    getMappedResource(name: string): string;
}
export class DomainRequestError {
    constructor();
    statusCode: HttpStatusCode;
    detailsCode: string;
    message: string;
}
export class NotFoundErrorBuilder {
    constructor();
    build(message?: string): DomainRequestError;
}
export class GlassCatError extends Error {
    constructor(code: number, message?: string);
    private _code;
    private initObj(code);
    getCode(): number;
}
export enum GlassCatErrorCode {
    SINGLETON_ERROR = 0,
    CONFIG_LOADING_FAILURE = 1,
    CONFIG_SERIALIZATION_ERROR = 2,
    CONFIG_UPDATE_ERROR = 3,
    NULL_EJP_CONFIG = 4,
    EJP_CONFIG_MISSING_PROPERTY = 5,
    EJP_CONFIG_INVALID_PROPERTY = 6,
    EJP_CONFIG_INVALID_LOGIN = 7,
    EJP_CONFIG_INVALID_REALM = 8,
    INVALID_SECURITY_CONTEXT = 9,
    INVALID_ENCRYPTION_KEY = 10,
    INVALID_CONTEXT = 11,
    ADMIN_REALM_INIT_FAILURE = 12,
    INVALID_JSLET_CONFIG = 13,
    INVALID_BOOTSTRAP_CONFIG = 14,
}
export class GlassCatLocaleManager {
    constructor();
    private static _locked;
    private static INSTANCE;
    static getInstance(): LocaleManager;
}
export class EjpJsletContext extends AbstractContainerContext implements JsletContext {
    constructor(connector: DomainConnector, securityContext: SecurityContext, sessionContext: SessionContext, loginStrategy: LoginStrategy);
    private _jsletMap;
    private _urlPatternUtils;
    private _urlPatternBuilder;
    private _urlPatternColl;
    private _securityContext;
    private _sessionContext;
    private _loginStrategy;
    private init(securityContext, sessionContext, loginStrategy);
    addJslet(jslet: Jslet): void;
    getJslet(url: string): Jslet;
    getSecurityContext(): SecurityContext;
    getSessionContext(): SessionContext;
    authenticate(req: HttpRequest, res: HttpResponse, result: (error?: any) => void): void;
    invalidateSession(req: HttpRequest, res: HttpResponse, result: (error?: SessionError) => any): void;
}
export class JsletConnector extends AbstractDecoratorConnector {
    constructor(jcadReference: string, decorator: Decorator);
}
export class WebJsletDecorator implements Decorator {
    constructor();
    private static readonly METADATA_REF;
    decorate(target: any, params: WebJsletParams): any;
}
export class JsletContextManager {
    constructor();
    private _jcadContext;
    private initContext(jcadReference, decoratorClass);
    private removeContext(jcadReference);
    createContext(jcadContext: JcadContext): void;
    deleteContext(): void;
    hasContext(jcadReference: string): boolean;
}
export class JsletContextBuilder {
    constructor();
    private static _locked;
    private static INSTANCE;
    static getInstance(): JsletContextBuilder;
    private buildJslet(path, target);
    buildContext(connector: DomainConnector, securityContext: SecurityContext, sessionContext: SessionContext, loginStrategy: LoginStrategy): JsletContext;
    initJslets(context: JsletContext, jslets: string[]): void;
}
export class JsletsAutowireProcessor implements FilePreProcessor {
    constructor();
    private static readonly WEBJSLET_MASK;
    private static readonly EXCHANGE_MASK;
    private _jsletFiles;
    private initObj();
    processStart(watcher: any, sourcePath: string): void;
    process(file: FileProperties, watcher: any): void;
    processComplete(watcher: any, sourcePath: string): void;
}
export interface ConnectionListener {
    getId(): string;
    getPort(): number;
    getAdress(): string;
    getServer(): string;
}
export class GlassCatHttpRequest implements HttpRequest {
    constructor(req: express.Request);
    protected __expReq: express.Request;
    private init(req);
    getBaseUrl(): string;
    getBody(): any;
    getCookies(): any;
    getHostname(): string;
    getIp(): string;
    getMethod(): string;
    getOriginalUrl(): string;
    getPath(): string;
    getProtocol(): string;
    getQuery(): any;
    isSecured(): boolean;
    accepts(type: string): boolean;
    acceptsCharset(charset: string): boolean;
    acceptsEncoding(encoding: string): boolean;
    acceptsLanguage(lang: string): boolean;
    getHeader(field: string): string;
    isTypeOfContent(type: string | string[]): boolean;
}
export class GlassCatHttpResponse implements HttpResponse {
    constructor(res: express.Response);
    protected __expRsq: express.Response;
    private init(res);
    getHeadersSent(): boolean;
    attachment(filename?: string): HttpResponse;
    cookie(name: string, value: string, options?: CookieOptions): HttpResponse;
    clearCookie(name: string, options?: CookieOptions): HttpResponse;
    download(path: string, filename?: string, complete?: (err?: Error) => any): void;
    end(data?: any, encoding?: string): HttpResponse;
    format(obj: any): HttpResponse;
    getHeader(field: string): string;
    links(links: any): HttpResponse;
    location(path: string): HttpResponse;
    redirect(path: string): HttpResponse;
    send(body: any): HttpResponse;
    sendFile(path: string, options?: SendFileOptions, complete?: (err?: Error) => any): HttpResponse;
    sendStatus(statusCode: HttpStatusCode): HttpResponse;
    setHeader(field: string, value: string): HttpResponse;
    status(statusCode: HttpStatusCode): HttpResponse;
    type(type: string): HttpResponse;
    vary(field: string): HttpResponse;
    getLocalProperties(): HttpLocalProperties;
}
export class ConsoleTransactionMonitor implements TransactionMonitor {
    constructor();
    send(transaction: HttpTransaction): void;
}
export class HttpTransaction {
    constructor(url: string);
    private init(url);
    private _id;
    private _url;
    private _initialTimestamp;
    private _finalTimestamp;
    private _closed;
    private _success;
    getInitialTimestamp(): number;
    getFinalTimestamp(): number;
    getUrl(): string;
    getId(): string;
    isClosed(): boolean;
    getSuccess(): boolean;
    close(success: boolean): void;
    toString(): string;
}
export class TransactionManager {
    constructor();
    private _transactionMonitor;
    private _transactionMap;
    private init();
    getTransactionMonitor(): TransactionMonitor;
    setTransactionMonitor(transactionMonitor: TransactionMonitor): void;
    openTransaction(req: express.Request, res: express.Response): void;
    closeTransaction(req: express.Request, res: express.Response): void;
}
export interface TransactionMonitor {
    send(transaction: HttpTransaction): void;
}
export class TransactionMonitorDerivation implements TransactionMonitor {
    constructor();
    send(transaction: HttpTransaction): void;
}
export interface TransactionMonitorFactory {
    build(): TransactionMonitor;
}
export class RoutePattern {
    constructor(pattern: string);
    private _pattern;
    private _name;
    private init(pattern);
    getName(): string;
    setName(name: string): void;
    match(url: string, success: (result: any) => void, fail: () => void): void;
    test(url: string): boolean;
    exec(url: string): any;
}
export function Routes(metadata: any): Function;
export class EjpSecurityContext implements SecurityContext {
    constructor(contextRoot: string);
    private _contextRoot;
    private _securityRoleMap;
    private _constraintsMap;
    private _staticResourcesMap;
    private _urlPatternUtils;
    private _urlPatternColl;
    private init(contextRoot);
    addSecurityRole(role: SecurityRole): void;
    getSecurityRole(name: string): SecurityRole;
    addSecurityConstraint(constraint: SecurityConstraint): void;
    getSecurityConstraint(url: string): SecurityConstraint;
    addStaticResources(resources: StaticResources): void;
    getStaticResources(url: string): StaticResources;
    getContextRoot(): string;
}
export class EjpSessionContext implements SessionContext {
    constructor(contextRoot: string, config: EjpConfig);
    private _contextRoot;
    private _sessionManager;
    private _sessionBuilder;
    private _sessionMap;
    private _maxAge;
    private _errorUrl;
    private _sessionErrorBuilder;
    private init(contextRoot, config);
    private initSessionManager(sessionConfig);
    private processExpiredSession(sessionId, result);
    getContextRoot(): string;
    getErrorUrl(): string;
    invalidateSession(req: HttpRequest, result: (error?: SessionError) => any): void;
    initSessionId(): SessionId;
    initSession(req: HttpRequest, sessionOwner: SessionOwner, result: (error?: SessionError) => any): void;
    loadSession(sessionId: SessionId, result: (error?: SessionError) => any): void;
    refreshSession(sessionId: SessionId, data: any, result: (error?: SessionError) => any): void;
    unloadSession(sessionId: SessionId, result: (error?: SessionError) => any): void;
    hasSession(sessionId: SessionId): boolean;
    getSession(sessionId: SessionId): Session;
}
export class BasicSecurityConstraint implements SecurityConstraint {
    constructor(context: EjpConstraintConfig);
    private _name;
    private _errorUrl;
    private _urlPattern;
    private _roles;
    private init(context);
    getName(): string;
    getUrlPattern(): UrlPattern;
    hasRole(role: string): boolean;
    getErrorUrl(): string;
}
export class BasicStaticResources implements StaticResources {
    constructor(context: EjpStaticResourcesConfig);
    private _urlPattern;
    private init(context);
    getUrlPattern(): UrlPattern;
}
export class DefaultUserHashModule implements UserHashModule {
    constructor();
    private _key;
    private readonly HASH_ALGORITHM;
    private readonly SPACER;
    private readonly ALGORITHM;
    private readonly ROLES_SEPARATOR;
    private checkKey();
    private getCipher();
    private getDecipher();
    private encryptString(text);
    private decryptString(text);
    setPrivateKey(key: string): void;
    encryptUser(alias: string, password: string, roles: string[]): string;
    encryptAlias(alias: string): string;
    encryptPassword(password: string): string;
    encryptRoles(roles: string[]): string;
    decryptAlias(alias: string): string;
    decryptRoles(roles: string): string[];
}
export class EjpLoginStrategyConfig implements LoginStrategyConfig {
    constructor(context: EjpLoginConfig);
    private init(context);
    private _context;
    private _authMethod;
    private _formProperties;
    private _securedArea;
    getAuthMethod(): AuthMethod;
    getFormProperties(): FormProperties;
    getSecuredArea(): string;
}
export class FormProperties {
    constructor(context: EjpFormConfig);
    private _loginUrl;
    private _errorUrl;
    private init(context);
    getLoginUrl(): string;
    getErrorUrl(): string;
}
export interface LoginStrategyConfig {
    getAuthMethod(): AuthMethod;
    getFormProperties(): FormProperties;
    getSecuredArea(): string;
}
export class LoginStrategy {
    constructor(strategyConfig: LoginStrategyConfig);
    private _strategyConfig;
    private _loginModule;
    private _jsletContext;
    private _sessionContext;
    private init(strategyConfig);
    initStrategy(container: DomainContainer): void;
    applyLoginStrategy(req: HttpRequest, res: HttpResponse, result: (error?: any) => void): void;
    getLoginStrategyConfig(): LoginStrategyConfig;
    getJsletContext(): JsletContext;
    authenticate(req: HttpRequest, res: HttpResponse, result: (error?: any) => void): void;
    invalidateSession(req: HttpRequest, res: HttpResponse, result: (error?: SessionError) => any): void;
}
export abstract class AbstractLoginModule implements LoginModule {
    constructor();
    protected __realm: Realm;
    protected __strategy: LoginStrategy;
    protected __loginStrategyConfig: LoginStrategyConfig;
    setLoginStrategy(strategy: LoginStrategy): void;
    applyLoginStrategy(req: HttpRequest, res: HttpResponse, result: (error?: any) => void): void;
    applyLogoutStrategy(req: HttpRequest, res: HttpResponse, result: (error?: any) => void): void;
    applyAuthenticationStrategy(req: HttpRequest, res: HttpResponse, error: any, result: (error?: any) => void): void;
    getCredentials(req: HttpRequest): Credentials;
    authenticate(credentials: Credentials, success: (owner: SessionOwner) => void, error: (error: AuthenticationError) => void): void;
}
export class BasicModule extends AbstractLoginModule {
    constructor();
    private static readonly AUTHORIZATION;
    private static readonly BASIC;
    private static readonly SEPARATOR;
    private buildRealm();
    private buildUnauthorizedResponse(res);
    applyLoginStrategy(req: HttpRequest, res: HttpResponse, result: (error?: any) => void): void;
    applyLogoutStrategy(req: HttpRequest, res: HttpResponse, result: (error?: any) => void): void;
    applyAuthenticationStrategy(req: HttpRequest, res: HttpResponse, error: any, result: (error?: any) => void): void;
    getCredentials(req: HttpRequest): Credentials;
}
export class EjpFormModule extends AbstractLoginModule {
    constructor();
    applyLoginStrategy(req: HttpRequest, res: HttpResponse, result: (error?: any) => void): void;
    applyAuthenticationStrategy(req: HttpRequest, res: HttpResponse, error: any, result: (error?: any) => void): void;
    applyLogoutStrategy(req: HttpRequest, res: HttpResponse, result: (error?: any) => void): void;
    getCredentials(req: HttpRequest): Credentials;
}
export interface LoginModule {
    setLoginStrategy(strategy: LoginStrategy): void;
    applyLoginStrategy(req: HttpRequest, res: HttpResponse, result: (error?: any) => void): void;
    applyLogoutStrategy(req: HttpRequest, res: HttpResponse, result: (error?: any) => void): void;
    applyAuthenticationStrategy(req: HttpRequest, res: HttpResponse, error: any, result: (error?: any) => void): void;
    getCredentials(req: HttpRequest): Credentials;
    authenticate(credentails: Credentials, success: (owner: SessionOwner) => void, error: (error: AuthenticationError) => void): void;
}
export abstract class AbstractRealmConnector implements RealmConnector {
    constructor();
    protected __securityContext: SecurityContext;
    protected __userHashModule: UserHashModule;
    protected extractRoles(roles: string[]): SecurityRole[];
    authenticate(credentials: Credentials, success: (owner: SessionOwner) => void, error: (error: AuthenticationError) => void): void;
    setSecurityContext(securityContext: SecurityContext): void;
    setUserHashModule(userHashModule: UserHashModule): void;
    getUserHashModule(): UserHashModule;
}
export class AdminFileRealmConnector extends AbstractRealmConnector implements RealmConnector {
    constructor();
    private readonly LINE_EVENT;
    private readonly CLOSE_EVENT;
    private readonly SPACER;
    private _gksPath;
    private init();
    private throwInitError(error);
    private getStream();
    private getReadLine(stream);
    authenticate(credentials: Credentials, success: (sessionOwner: SessionOwner) => void, error: (err: AuthenticationError) => void): void;
}
export class DefaultRealm implements Realm {
    constructor(config: LoginStrategyConfig);
    private _realmType;
    private _realmConnector;
    private init(config);
    getRealmType(): RealmType;
    getRealmConnector(): RealmConnector;
    authenticate(credentials: Credentials, success: (sessionOwner: SessionOwner) => void, error: (error: AuthenticationError) => void): void;
}
export class DefaultRealmBuilder implements RealmBuilder {
    constructor();
    buildRealm(strategyConfig: LoginStrategyConfig, securityContext: SecurityContext): Realm;
}
export interface RealmBuilder {
    buildRealm(strategyConfig: LoginStrategyConfig, securityContext: SecurityContext): Realm;
}
export class BasicSecurityRole implements SecurityRole {
    constructor(name: string);
    protected __name: string;
    private initObj(name);
    getName(): string;
}
export class BasicCredentials implements Credentials {
    constructor();
    login: string;
    password: string;
}
export class LocalSessionStorage implements SessionStorage {
    constructor();
    private _sessionMap;
    private _sessionMapTimer;
    private _sessionMapTimerInterval;
    private _sessionErrorBuilder;
    private initObj();
    private invalidateSessionMap();
    private checkSessionMapSize();
    add(session: Session, result: (error?: SessionError) => any): void;
    get(sessionId: SessionId, success: (session: Session) => any, error: (error: SessionError) => any): void;
    remove(sessionId: SessionId, result: (error?: SessionError) => any): void;
    clearExpired(): void;
}
export interface SessionStorage {
    add(session: Session, result: (error?: SessionError) => any): void;
    get(sessionId: SessionId, success: (session: Session) => any, error: (error: SessionError) => any): void;
    remove(sessionId: SessionId, result: (error?: SessionError) => any): void;
}
export class BasicAuthenticationError implements AuthenticationError {
    constructor(statusCode: HttpStatusCode);
    private _statusCode;
    getStatusCode(): HttpStatusCode;
}
export class BasicSessionError implements SessionError {
    constructor(sessionId: SessionId, errorType: SessionErrorType, message?: string);
    private _sessionId;
    private _errorType;
    private _message;
    private initObj(sessionId, errorType, message?);
    getSessionId(): SessionId;
    getErrorType(): SessionErrorType;
    getMessage(): string;
    toString(): string;
}
export class GlassCatSession implements Session {
    constructor();
    sessionId: SessionId;
    sessionOwner: SessionOwner;
    expires: number;
    data: any;
}
export class GlassCatSessionId implements SessionId {
    constructor(id: string);
    private _id;
    getId(): string;
    authurl: string;
}
export class GlassCatSessionOwner implements SessionOwner {
    constructor(id: string, alias: string, roles: SecurityRole[]);
    private _id;
    private _alias;
    private _roles;
    private init(id, alias, roles);
    getAlias(): string;
    isGranted(securityConstraint: SecurityConstraint): boolean;
}
export class EjpSessionManager implements SessionManager {
    constructor();
    private _guid;
    private readonly HASH_ALGORITHM;
    private readonly OUTPUT_ENCODING;
    private _connector;
    private _sessionIdBuilder;
    private init();
    getSessionStorage(): SessionStorage;
    setSessionStorage(sessionStorage: SessionStorage): void;
    initSessionId(): SessionId;
    addSession(session: Session, result: (error?: SessionError) => any): void;
    getSession(sessionId: SessionId, success: (session: Session) => any, error: (error: SessionError) => any): void;
    removeSession(sessionId: SessionId, result: (error?: SessionError) => any): void;
}
export interface SessionManager {
    getSessionStorage(): SessionStorage;
    setSessionStorage(sessionStorage: SessionStorage): void;
    initSessionId(): SessionId;
    addSession(session: Session, result: (error?: SessionError) => any): void;
    getSession(sessionId: SessionId, success: (session: Session) => any, error: (error: SessionError) => any): void;
    removeSession(sessionId: SessionId, result: (error?: SessionError) => any): void;
}
export class CredentialsBuilder {
    constructor();
    build(login: string, password: string): Credentials;
}
export class SessionBuilder {
    constructor();
    buildSession(sessionId: SessionId, sessionOwner: SessionOwner): Session;
}
export class SessionErrorBuilder {
    constructor();
    build(sessionId: SessionId, type: SessionErrorType, message?: string): SessionError;
}
export class SessionIdBuilder {
    constructor();
    buildSessionId(guid: string): SessionId;
}
export class SessionIdUtil {
    private static readonly SEPARATOR;
    private static readonly PARAM_SEPARATOR;
    static readonly SESSION_ID_NAME: string;
    static readonly COOKIES: string;
    static parseSessionIdCookie(cookies: any): SessionId;
    static stringifySessionId(sessionId: SessionId): string;
}
export class SessionOwnerBuilder {
    constructor();
    build(id: string, alias: string, roles: SecurityRole[]): SessionOwner;
}
export class SessionStorageSolver {
    constructor();
    getSessionStorage(config: EjpSessionConfig): SessionStorage;
}
export class SessionUtil {
    static getExirationTime(maxAge: number): number;
    static setSessionCookie(res: any, sessionId: SessionId, service: HttpService): void;
}
export class SecurityConstraintBuilder {
    constructor();
    build(context: EjpConstraintConfig): SecurityConstraint;
}
export class StaticResourcesBuilder {
    constructor();
    build(context: EjpStaticResourcesConfig): StaticResources;
}
/// <reference types="node" />
export abstract class AbstractHttpService implements HttpService {
    constructor(listener: HttpListener);
    protected __listener: HttpListener;
    protected __app: express.Application;
    protected __server: http.Server;
    protected __connectorManager: DomainConnectorManager;
    protected __securityManager: SecurityManager;
    protected __transactionManager: TransactionManager;
    protected __enableMonitoring: boolean;
    protected __errorManager: HttpServiceErrorManager;
    private _isActive;
    private _server;
    private _notFoundErrorBuilder;
    private readonly GLASSCAT;
    private init(listener);
    private initSecuredServer();
    private holdTransaction(req, res, next);
    private releaseTransaction(req, res, next);
    private checkSession(req, res, next);
    private validateRequest(req, res, next);
    private processRequest(req, res, next);
    private initHeadersSecurity();
    private initTransactionInterceptor();
    private initTransactionFilter();
    private initSessionsSecurity();
    private createTransactionInterceptors();
    private initErrorFilter();
    getHttpListener(): HttpListener;
    initConnectors(connectorManager: DomainConnectorManager): void;
    initSecurity(securityManager: SecurityManager): void;
    start(): void;
    stop(): void;
    isActive(): boolean;
}
export class DefaultHttpService extends AbstractHttpService implements HttpService {
    constructor(listener: HttpListener);
}
export interface HttpService {
    getHttpListener(): HttpListener;
    initConnectors(connectorManager: DomainConnectorManager): void;
    initSecurity(securityManager: SecurityManager): void;
    start(): void;
    stop(): void;
    isActive(): boolean;
}
export class DefaultHttpListener implements HttpListener {
    constructor(config: HttpListenerConfig);
    private _id;
    private _port;
    private _address;
    private _isSecured;
    private _server;
    private _protocol;
    private _domain;
    private _securityConfig;
    private _enableMonitoring;
    private _transactionMonitor;
    private init(config);
    getId(): string;
    getPort(): number;
    getAdress(): string;
    getSecured(): boolean;
    getServer(): string;
    getProtocol(): HttpConnectionType;
    getDomain(): string;
    getSecurityConfig(): string[];
    enableMonitoring(): boolean;
    getTransactionMonitor(): TransactionMonitor;
}
export interface HttpListener extends ConnectionListener {
    getSecured(): boolean;
    getProtocol(): HttpConnectionType;
    getDomain(): string;
    getSecurityConfig(): string[];
    enableMonitoring(): boolean;
    getTransactionMonitor(): TransactionMonitor;
}
export class HttpListenerFactory {
    constructor();
    build(config: HttpListenerConfig): HttpListener;
}
export class HttpMonitoring {
    constructor(config: HttpMonitoringConfig);
    private _config;
    private _enableMonitoring;
    private _transactionMonitor;
    init(config: HttpMonitoringConfig): void;
    enableMonitoring(): boolean;
    getTransactionMonitor(): TransactionMonitor;
}
/// <reference types="node" />
export class ResourceProxy {
    constructor();
    private static _locked;
    private static INSTANCE;
    static getInstance(): ResourceProxy;
    private static readonly RESOURCE_PROXY_SIZE;
    private static readonly INDEX;
    private static readonly RESOURCE_PROXY_PATTERN;
    getConectorRef(listener: HttpListener, contextRoot: string): string;
    testUrl(url: string): boolean;
    getProxyPath(baseUrl: string, listener: HttpListener, domainConnectorManager: DomainConnectorManager): string;
    loadFile(path: string, callback: (err: NodeJS.ErrnoException, data: Buffer) => void): void;
}
export class HttpLocalProperties {
    constructor();
    connector: DomainConnector;
    contextRootData: ContextRootData;
    containerState: string;
    sessionId: SessionId;
    transactionFails: boolean;
    isStatic: boolean;
    trimmedUrl: string;
    redirectUrl: string;
    contextRootRef: string;
}
export class HttpServiceBuilder {
    constructor();
    buildServices(httpServiceManager: HttpServiceManager, httpListenerConfigList: Array<HttpListenerConfig>): void;
}
/// <reference types="node" />
export class HttpServiceErrorManager {
    constructor();
    processNestedResourceError(properties: HttpLocalProperties, error: NodeJS.ErrnoException, httpRequest: HttpRequest, httpResponse: HttpResponse, errorTemplatePath: string): void;
    processDomainRequestError(properties: HttpLocalProperties, error: DomainRequestError, httpRequest: HttpRequest, httpResponse: HttpResponse, errorTemplatePath: string): void;
    processSessionError(properties: HttpLocalProperties, error: SessionError, httpRequest: HttpRequest, httpResponse: HttpResponse, errorTemplatePath: string): void;
    processAuthenticationError(properties: HttpLocalProperties, error: AuthenticationError, httpRequest: HttpRequest, httpResponse: HttpResponse, errorTemplatePath: string): void;
}
export class HttpServiceFactory {
    constructor();
    build(config: HttpListenerConfig): HttpService;
}
export class EjpBootstrapContext extends AbstractContainerContext implements BootstrapContext {
    constructor(connector: DomainConnector);
    private _scriptList;
    private init();
    addScript(script: BootstrapScript): void;
    getScriptList(): BootstrapScript[];
}
export class BootstrapContextManager {
    constructor();
    private _jcadContext;
    private initContext(jcadReference, decoratorClass);
    private removeContext(jcadReference);
    createContext(jcadContext: JcadContext): void;
    deleteContext(): void;
    hasContext(jcadReference: string): boolean;
}
export class BootstrapConnector extends AbstractDecoratorConnector {
    constructor(jcadReference: string, decorator: Decorator);
}
export class BootstrapDecorator implements Decorator {
    constructor();
    decorate(target: any, params: BootstrapParams): any;
}
export class BootstrapAutowireProcessor implements FilePreProcessor {
    constructor();
    private static readonly BOOTSTRAP_MASK;
    private static readonly COMMONS_MASK;
    private _bootstrapFiles;
    private initObj();
    processStart(watcher: any, sourcePath: string): void;
    process(file: FileProperties, watcher: any): void;
    processComplete(watcher: any, sourcePath: string): void;
}
export class BootstrapContextBuilder {
    constructor();
    private static _locked;
    private static INSTANCE;
    static getInstance(): BootstrapContextBuilder;
    buildContext(connector: DomainConnector): BootstrapContext;
}
export class BootstrapScriptBuilder {
    constructor();
    build(path: string, priority?: number): BootstrapScript;
}
export class BootstrapScriptRunner {
    constructor();
    runAll(container: DomainContainer): void;
}
export class BootstrapScriptSorter {
    constructor();
    private sortFunction(obj1, obj2);
    sortCollection(bootstrapCollection: BootstrapScript[]): void;
}
export class DefaultTemplateProcessor implements TemplateProcessor {
    constructor();
    renderFile(templatePath: string, data: any, req: HttpRequest, res: HttpResponse): void;
}
export class ErrorTemplateProcessor implements TemplateProcessor {
    constructor();
    private static _locked;
    private static INSTANCE;
    static getInstance(): ErrorTemplateProcessor;
    renderFile(templatePath: string, data: any, req: HttpRequest, res: HttpResponse): void;
}
export class ErrorStatusBuilder {
    constructor();
    private static _locked;
    private static INSTANCE;
    static getInstance(): ErrorStatusBuilder;
    build(req: HttpRequest, res: HttpResponse, templatePath: string, statusCode?: HttpStatusCode, detailsCode?: string): void;
}
export class ForbiddenStatusBuilder {
    constructor();
    private static _locked;
    private static INSTANCE;
    static getInstance(): ForbiddenStatusBuilder;
    build(req: HttpRequest, res: HttpResponse, templatePath: string, detailsCode?: string): void;
}
export class HttpStatusReport {
    constructor();
    title: string;
    type: string;
    message: string;
    description: string;
    version: string;
    status: number;
    codeName: string;
    toString(): string;
}
export class HttpStatusReportBuilder {
    constructor();
    private static _locked;
    private static INSTANCE;
    static getInstance(): HttpStatusReportBuilder;
    private _version;
    private _codeName;
    init(version: string, codeName: string): void;
    build(status: number, title: string, message: string, description: string): HttpStatusReport;
}
export interface TemplateProcessor {
    renderFile(templatePath: string, data: any, req: HttpRequest, res: HttpResponse): void;
}
export class ContextRootData {
    constructor();
    containsNestedResource: boolean;
    needsRedirection: boolean;
    newPath: string;
    contextRoot: string;
    reset(): void;
    toString(): string;
}
export class ContextRootUtil {
    constructor();
    private static readonly REFERER;
    private static readonly HOST;
    private _contextRootData;
    private init();
    static readonly INDEX: string;
    buildContextRoot(connector: DomainConnector, listener: HttpListener): string;
    extractContextRoot(reqest: express.Request): ContextRootData;
}
export class GlassCatBuilder {
    constructor();
    build(config: GlassCatConfig): GlassCat;
}
export class KernelBuilder {
    constructor();
    build(config: GlassCatConfig): Kernel;
}
export interface ConfigLoader {
    loadSync(): any;
    load(success: (data: any) => void, error: (err: GlassCatError) => void): void;
}
export abstract class ConfigLoaderBase {
    constructor();
    protected loadConfigSync(filePath: string): any;
    protected loadConfig(filePath: string, success: (data: any) => void, error: (err: GlassCatError) => void): void;
}
export class GlassCatLogFormatter implements LogFormatter {
    constructor();
    appender: string;
    timeFormat: string;
    format(level: LogLevelString, marker: any, useAppender?: boolean, context?: string): string;
}
export interface LoggerFactory {
    build(context: LoggerContext): Logger;
}
export class LoggerManager extends AbstractLogger {
    constructor();
    private static _locked;
    private static INSTANCE;
    static getInstance(): Logger;
    init(loggers: Logger[], logLevel: LogLevel): void;
    isInitialized(): boolean;
    private _initialized;
    private _loggers;
    setLogLevel(logLevel: LogLevel): void;
    setName(name: string): void;
    debug(marker: any): void;
    error(marker: any): void;
    info(marker: any): void;
    trace(marker: any): void;
    warn(marker: any): void;
    always(marker: any): void;
}
export class LoggerManagerBuilder {
    constructor();
    private _ctx;
    context(value: GlassCatContext): LoggerManagerBuilder;
    build(): Logger;
}
export class MappedPathUtil {
    constructor();
    private static _locked;
    private static INSTANCE;
    static getInstance(): MappedPathUtil;
    init(rootPath: string): void;
    isInitialized(): boolean;
    private _initialized;
    private _rootPath;
    private _glasscatPath;
    private _modulesPath;
    private static readonly SERVER_PATTERN;
    private static readonly ROOT_PATTERN;
    private static readonly MODULES_PATTERN;
    private static readonly GLASSCAT_PATH;
    private static readonly MODULES_PATH;
    resolve(rawPath: string): string;
}
export class TemplatePaths {
    constructor();
    projectPath: string;
    relativePathPattern: string;
    directoryPath: string;
    filePath: string;
}
export class TemplatePathsSolver {
    constructor();
    private static readonly WORKSPACE_PATH;
    private fixFilePath(path);
    private resolveRelativePath(path);
    private resolveProjectPath(project);
    private resolveDirPath(projectPath, path);
    private resolveFilePath(dirPath, fileName, extention);
    private countOccurrences(string, subString, allowOverlapping?);
    resolve(fileName: string, fileExtension: string, projectPath: string, filePath: string): TemplatePaths;
}
export class BasicUrlPattern implements UrlPattern {
    constructor();
    pattern: string;
    strict: boolean;
    baseUrl: string;
    baseUrlLength: number;
    toString(): string;
}
export class UrlPatternBuilder {
    constructor();
    build(pattern: string): UrlPattern;
}
export class UrlPatternUtils {
    constructor();
    match(url: string, pattern: UrlPattern): boolean;
}
export class UrlUtils {
    constructor();
    private static _locked;
    private static INSTANCE;
    static getInstance(): UrlUtils;
    trimContextRoot(urlPath: string, contextRootRef: string): string;
}
}