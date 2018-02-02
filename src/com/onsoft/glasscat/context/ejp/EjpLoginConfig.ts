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

import {EjpFormConfig} from "./EjpFormConfig";
import {EjpRealmConfig} from "./EjpRealmConfig";
import {AuthMethod} from "jec-exchange";

/**
 * Represents the login configuration for an EJP deployed in a GlassCat
 * container.
 */
export class EjpLoginConfig {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>EjpLoginConfig</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Public properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The authentication method used by the GlassCat container.
   */
  public authMethod:AuthMethod = null;

  /**
   * The configuration of the authentication for used by the GlassCat container.
   */
  public formConfig:EjpFormConfig = null;
  
  /**
   * The configuration of the realm for used by the GlassCat container. 
   */
  public realm:EjpRealmConfig = null;
}
