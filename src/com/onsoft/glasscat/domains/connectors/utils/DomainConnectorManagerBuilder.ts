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

import {DomainConnectorManager} from "../../../core/DomainConnectorManager";
import {DomainConnector} from "../DomainConnector";
import {DomainConnectorBuilder} from "./DomainConnectorBuilder";
import {HttpServiceManager} from "../../../core/HttpServiceManager";
import {HttpService} from "../../../services/http/HttpService";
import {HttpListener} from "../../../services/http/listeners/HttpListener";
import {ContextRootUtil} from "../../../util/contextroot/ContextRootUtil";
import {GlassCatContext} from "../../../context/GlassCatContext";
import {JsletManager} from "../../../core/JsletManager";
import {SecurityManager} from "../../../core/SecurityManager";
import {MappedPathUtil} from "../../../util/paths/MappedPathUtil";
import {DomainConfigLoader} from "../../../context/domains/utils/DomainConfigLoader";
import {JcadContext} from "jec-commons";

/**
 * The builder for <code>DomainConnectorManager</code> instances.
 */
export class DomainConnectorManagerBuilder{

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>DomainConnectorManagerBuilder</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Builds and returns the <code>DomainConnectorManager</code> instance for the 
   * current GlassCat container.
   *
   * @param {string} version the version of the  current GlassCat container.
   * @param {GlassCatContext} context a reference to the the context for the 
   *                                  current GlassCat container instance.
   * @param {HttpServiceManager} httpManager a reference to the
   *                                         <code>HttpServiceManager</code> 
   *                                         which is used  to build context
   *                                         root references.
   * @param {JsletManager} jsletManager the reference to the 
   *                                    <code>JsletManager</code> of the 
   *                                    GlassCat container. 
   * @param {SecurityManager} securityManager the reference to the 
   *                                          <code>SecurityManager</code> of 
   *                                          the GlassCat container. 
   * @param {JcadContext} jcadContext the reference to the
   *                                  <code>JcadContext</code> of the GlassCat
   *                                  container. 
   * @return {DomainConnectorManager} a new <code>DomainConnectorManager</code>
   *                                  instance.
   */
  public build(version:string,
               context:GlassCatContext,
               httpManager:HttpServiceManager,
               jsletManager:JsletManager,
               securityManager:SecurityManager,
               jcadContext:JcadContext):DomainConnectorManager {
    let manager:DomainConnectorManager = new DomainConnectorManager();
    let domainConfigLoader:DomainConfigLoader = new DomainConfigLoader();
    let json:any = domainConfigLoader.loadSync();
    let dcBuilder:DomainConnectorBuilder = new DomainConnectorBuilder();
    let domains:any = json.domains;
    let len:number = domains.length;
    let connector:DomainConnector = null;
    let httpService:HttpService = null;
    let data:any = null;
    manager.setErrorPage(context.getErrorPage());
    while(len--) {
      data = domains[len];
      data.target = MappedPathUtil.getInstance().resolve(data.target);
      connector = dcBuilder.build(version, data, jsletManager, jcadContext);
      httpService = httpManager.getService(connector.getServer());
      manager.addConnector(connector, httpService.getHttpListener());
    }
    httpManager.initManagers(manager, securityManager);
    return manager;
  }
}
