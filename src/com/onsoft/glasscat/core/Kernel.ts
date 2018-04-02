//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
//
//   Copyright 2016-2018 Pascal ECHEMANN.
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

import {GlassCatContext} from "../context/GlassCatContext";
import {GlassCatContextBuilder} from "../context/utils/GlassCatContextBuilder";
import {HttpServiceManager} from "./HttpServiceManager";
import {SplashScreen} from "./SplashScreen";
import {LoggerManager} from "../util/logging/LoggerManager";
import {HttpServiceBuilder} from "../services/http/utils/HttpServiceBuilder";
import {GlassCatLocaleManager} from "../i18n/GlassCatLocaleManager";
import {DomainConnectorManager} from "./DomainConnectorManager";
import {DomainConnectorManagerBuilder} from "../domains/connectors/utils/DomainConnectorManagerBuilder";
import {JsletManager} from "./JsletManager";
import {HttpStatusReportBuilder} from "../templates/status/HttpStatusReportBuilder";
import {SecurityManager} from "./SecurityManager";
import {UrlUtils} from "../util/url/UrlUtils";
import {MappedPathUtil} from "../util/paths/MappedPathUtil";
import {JcadContext, JcadContextFactory} from "jec-commons";
import {GlassCatConfig} from "./GlassCatConfig";

/**
 * Represents the kernel for a GlassCat container instance.
 */
export class Kernel {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>Kernel</code> instance.
   */
  constructor() {
    this.init();
  }

  ////////////////////////////////////////////////////////////////////////////
  // Private properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The current version of the web container.
   */
  private static readonly VERSION:string = "0.0.1";

  /**
   * The code name for the current version of the web container.
   */
  private static readonly CODE_NAME:string = "Korat";

  /**
   * Indicates the time at which the GlassCat container instance started.
   */
  private _startTime:number = 0;

  /**
   * Stores the context for the current GlassCat container instance.
   */
  private _context:GlassCatContext = null;

  /**
   * The reference to the <code>HttpServiceManager</code> instance.
   */
  private _httpServiceManager:HttpServiceManager = null;

  /**
   * The reference to the <code>DomainConnectorManager</code> instance.
   */
  private _domainConnectorManager:DomainConnectorManager = null;

  /**
   * The reference to the <code>JsletManager</code> instance.
   */
  private _jsletManager:JsletManager = null;

  /**
   * The reference to the <code>SecurityManager</code> instance.
   */
  private _securityManager:SecurityManager = null;

  /**
   * The reference to the JCAD context for this server.
   */
  private _jcadContext:JcadContext = null;

  /**
   * The reference to the GlassCat config for this server.
   */
  private _glasscatConfig:GlassCatConfig = null;

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes the Kernel instance. This method is called by the
   * constructor function.
   */
  private init():void {
    const splashScreen:SplashScreen = new SplashScreen();
    splashScreen.displayMessage(Kernel.VERSION);
    this.initJcadContext();
  }

  /**
   * Creates the <code>JcadContext</code> instance for this GlassCat container.
   */
  private initJcadContext():void {
    const ctxFactory:JcadContextFactory = new JcadContextFactory();
    this._jcadContext = ctxFactory.create();
  }

  /**
   * Creates the <code>HttpListener</code> instances for this GlassCat container.
   */
  private createHttpListeners():void {
    this._httpServiceManager = new HttpServiceManager();
    const builder:HttpServiceBuilder = new HttpServiceBuilder();
    builder.buildServices(
      this._httpServiceManager,
      this._context.getHttpListenerConfigList()
    );
  }

  /**
   * Initializes the locales for this GlassCat container.
   */
  private initLocales():void {
    GlassCatLocaleManager.getInstance().init(this._context.getLocale());
  }

  /**
   * Initializes the <code>DomainConnector</code> instances for this GlassCat
   * container.
   */
  private initDomainConnectors():void {
    const dcmb:DomainConnectorManagerBuilder =
                                            new DomainConnectorManagerBuilder();
    this._domainConnectorManager = dcmb.build(
                                      Kernel.VERSION,
                                      this._context,
                                      this._httpServiceManager,
                                      this._jsletManager,
                                      this._securityManager,
                                      this._jcadContext
                                    );
    this._securityManager.setDomainConnectorManager(
      this._domainConnectorManager
    );
  }

  /**
   * Initializes the security layer for this GlassCat container.
   */
  private initSecurityLayer():void {
    this._securityManager = new SecurityManager();
  }

  /**
   * Initializes the jslet engine for this GlassCat container.
   */
  private initJsletEngine():void {
    this._jsletManager = new JsletManager();
  }

  /**
   * Initializes the singletons used by this GlassCat container for faster
   * processing.
   */
  private initSingletons():void {
    HttpStatusReportBuilder.getInstance()
                           .init(Kernel.VERSION, Kernel.CODE_NAME);
    UrlUtils.getInstance();
  }

  /**
   * Initializes the root path for the current GlassCat container.
   *
   * @param {string} root the root path for the current GlassCat container.
   */
  private initRootPath(root:string):void {
    MappedPathUtil.getInstance().init(root);
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes the GlassCat container context.
   * 
   * @param {GlassCatConfig} config the GlassCat config for this container.
   */
  public initContext(config:GlassCatConfig):void {
    this._startTime = Date.now();
    const root:string = process.cwd();
    this._glasscatConfig = config;
    this.initRootPath(root);
    const ctxBuilder:GlassCatContextBuilder = new GlassCatContextBuilder();
    this._context = ctxBuilder.buildContext();
    this.initLocales();
  }

  /**
   * Initializes the core services of the GlassCat container.
   */
  public initServices():void {
    this.initSingletons();
    this.initSecurityLayer();
    this.initJsletEngine();
    this.createHttpListeners();
    this.initDomainConnectors();
  }

  /**
   * Initializes the GlassCat container core services.
   */
  public startServices():void {
    this._httpServiceManager.startServices();
  }

  /**
   * Kills the GlassCat container core services.
   */
  public stopServices():void {
    this._httpServiceManager.stopServices();
  }

  /**
   * Returns the GlassCat container context.
   * @return {GlassCatContext} the GlassCat container context.
   */
  public getContext():GlassCatContext {
    return this._context;
  }

  /**
   * Returns the GlassCat container version.
   *
   * @return {string} a String that represents the GlassCat container version.
   */
  public getVersion():string {
    return Kernel.VERSION;
  }
};
