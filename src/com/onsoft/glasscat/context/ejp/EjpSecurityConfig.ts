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

import {EjpConstraintConfig} from "./EjpConstraintConfig";
import {EjpRoleConfig} from "./EjpRoleConfig";
import {EjpStaticResourcesConfig} from "./EjpStaticResourcesConfig";

/**
 * Represents the <code>webapp.security</code> configuration property for an EJP  
 * deployed in a GlassCat container.
 */
export class EjpSecurityConfig {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>EjpSecurityConfig</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Public properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * An array of security constraints for the EJP deployed in a GlassCat
   * container.
   */
  public constraints:EjpConstraintConfig[] = null;
  
  /**
   * An array of security roles for the EJP deployed in a GlassCat container.
   */
  public roles:EjpRoleConfig[] = null;
  
  /**
   * An array of static resources for the EJP deployed in a GlassCat container.
   */
  public staticResources:EjpStaticResourcesConfig[] = null;
}
