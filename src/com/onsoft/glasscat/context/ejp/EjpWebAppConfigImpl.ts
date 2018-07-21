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

import {EjpJsletsConfig, EjpBootstrapConfig, EjpSessionConfig, EjpLoginConfig,
        EjpResourceMapperConfig, EjpSecurityConfig, EjpWebAppConfig} from "jec-glasscat-config";

/**
 * The <code>EjpWebAppConfigImpl</code> class is the default implementation of
 * the <code>EjpWebAppConfig</code> interface.
 */
export class EjpWebAppConfigImpl implements EjpWebAppConfig {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>EjpWebAppConfigImpl</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Public properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public name:string = null;
  
  /**
   * @inheritDoc
   */
  public description:string = null;
  
  /**
   * @inheritDoc
   */
  public version:string = null;
  
  /**
   * @inheritDoc
   */
  public author:string = null;

  /**
   * @inheritDoc
   */
  public contextRoot:string = null;
  
  /**
   * @inheritDoc
   */
  public state:string = null;
  
  /**
   * @inheritDoc
   */
  public welcomeFile:string = null;
  
  /**
   * @inheritDoc
   */
  public jslets:EjpJsletsConfig = null;

  /**
   * @inheritDoc
   */
  public bootstrap:EjpBootstrapConfig[] = null;
  
  /**
   * @inheritDoc
   */
  public session:EjpSessionConfig = null;
  
  /**
   * @inheritDoc
   */
  public resourceMap:Array<EjpResourceMapperConfig> = null;
  
  /**
   * @inheritDoc
   */
  public login:EjpLoginConfig = null;
  
  /**
   * @inheritDoc
   */
  public security:EjpSecurityConfig = null;
}
