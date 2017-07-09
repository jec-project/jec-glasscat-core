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

import {EjpJsletsConfig} from "./EjpJsletsConfig";
import {EjpBootstrapConfig} from "./EjpBootstrapConfig";
import {EjpSessionConfig} from "./EjpSessionConfig";
import {EjpResourceMapperConfig} from "./EjpResourceMapperConfig";
import {EjpLoginConfig} from "./EjpLoginConfig";
import {EjpSecurityConfig} from "./EjpSecurityConfig";

/**
 * Represents the <code>webapp</code> configuration property for an EJP deployed 
 * in a GlassCat container.
 */
export class EjpWebAppConfig {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>EjpWebAppConfig</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Public properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The name of the EJP.
   */
  public name:string = null;
  
  /**
   * The description of the project associated with the EJP.
   */
  public description:string = null;
  
  /**
   * The current project version.
   */
  public version:string = null;
  
  /**
   * The project author information.
   */
  public author:string = null;

  /**
   * The project context root.
   */
  public contextRoot:string = null;
  
  /**
   * The project container state.
   */
  public state:string = null;
  
  /**
   * The welcome file for this project.
   */
  public welcomeFile:string = null;
  
  /**
   * The configuration for all Jslets in this project.
   */
  public jslets:EjpJsletsConfig = null;

  /**
   * The bootstrap files configuration this project.
   */
  public bootstrap:EjpBootstrapConfig[] = null;
  
  /**
   * The session configuration this project.
   */
  public session:EjpSessionConfig = null;
  
  /**
   * The resources map configuration this project.
   */
  public resourceMap:Array<EjpResourceMapperConfig> = null;
  
  /**
   * The login configuration this project.
   */
  public login:EjpLoginConfig = null;
  
  /**
   * The security configuration this project.
   */
  public security:EjpSecurityConfig = null;
}
