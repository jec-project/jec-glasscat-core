//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
//
//   Copyright 2016-2017 Pascal ECHEMANN.
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

import {DomainConnector} from "./DomainConnector";
import {EjpConfigLoader} from "../../context/ejp/utils/EjpConfigLoader";
import {EjpConfigParser} from "../../context/ejp/utils/EjpConfigParser";
import {EjpConfig} from "../../context/ejp/EjpConfig";
import {DomainContainer} from "../containers/DomainContainer";
import {HttpService} from "../../services/http//HttpService";
import {JsletManager} from "../../core/JsletManager";
import * as moment from "moment";
import {JcadContext} from "jec-commons";

/**
 * <code>AbstractDomainConnector</code> is the abstract class for
 * <code>DomainConnector</code> instances.
 */
export class AbstractDomainConnector implements DomainConnector {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>AbstractDomainConnector</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Protected properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The version of the current GlassCat container.
   */
  protected __version:string = null;

  /**
   * The name for this <code>DomainConnector</code> instance.
   */
  protected __name:string = null;

  /**
   * The target directory for this <code>DomainConnector</code> instance.
   */
  protected __target:string = null;

  /**
   * The context root for this <code>DomainConnector</code> instance.
   */
  protected __contextRoot:string = null;

  /**
   * The host for this <code>DomainConnector</code> instance.
   */
  protected __host:string = null;

  /**
   * The configuration properties loaded from the WEB-INF directory.
   */
  protected __config:EjpConfig = null;

  /**
   * The server for this <code>DomainConnector</code> instance.
   */
  protected __server:string = null;

  /**
   * The domain container for this <code>DomainConnector</code> instance.
   */
  protected __container:DomainContainer = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The starting time of the processes associated with this connector.
   */
  private _startDate:string = null;

  /**
   * The reference to the GlassCat <code>JcadContext</code> instance.
   */
  private _jcadContext:JcadContext = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @private
   */
  private getServerInfo():string {
    return "GlassCat/" + this.__version;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public init(version:string, data:any, jsletManager:JsletManager,
                                                 jcadContext:JcadContext):void {
    this._startDate = moment().format("MM/DD/YY HH:mm:ss");
    this.__version = version;
    this.__name = data.name;
    this.__target = data.target;
    this.__server = data.connector.server;
    this.__host = data.host;
    this._jcadContext = jcadContext;
    let loader:EjpConfigLoader = new EjpConfigLoader();
    let parser:EjpConfigParser = new EjpConfigParser();
    let configFile:any = loader.loadSync(this.__target);
    this.__config = parser.parse(configFile);
    this.__contextRoot = this.__config.webapp.contextRoot;
  }

  /**
   * @inheritDoc
   */
  public getName():string {
    return this.__name;
  }

  /**
   * @inheritDoc
   */
  public getTarget():string {
    return this.__target;
  }

  /**
   * @inheritDoc
   */
  public getContextRoot():string {
    return this.__contextRoot;
  }

  /**
   * @inheritDoc
   */
  public getHost():string {
    return this.__host;
  }

  /**
   * @inheritDoc
   */
  public getServer():string {
    return this.__server;
  }
  
  /**
   * @inheritDoc
   */
  public getContainer():DomainContainer {
    return this.__container;
  }

  /**
   * @inheritDoc
   */
  public getConfig():EjpConfig {
    return this.__config;
  }

  /**
   * @inheritDoc
   */
  public getJcadContext():JcadContext {
    return this._jcadContext;
  }

  /**
   * @inheritDoc
   */
  public getStatusInfo():any {
    let msg:string = "application started at " + this._startDate + 
                     ", on server '" + this.__server + "'.";
    let status:Object = {
        title: this.__name,
        type: "Project status",
        message: "test",
        description: msg,
        serverInfo: this.getServerInfo()
      };
    return status;
  }
}
