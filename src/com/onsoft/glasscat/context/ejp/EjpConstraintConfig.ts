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

/**
 * Represents a security constraint configuration property for an EJP deployed 
 * in a GlassCat container.
 */
export class EjpConstraintConfig {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////
  
  /**
   * Creates a new <code>EjpConstraintConfig</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Public properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The name of the security constraint.
   */
  public name:string = null;
  
  /**
   * An array that contains the roles for this security constraint.
   */
  public roles:string[] = null;
  
  /**
   * The URL pattern associated with this security constraint.
   */
  public urlPattern:string = null;
  
  /**
   * The URL to go whether an error occured while trying to access the resource
   * associated with this security constraint.
   */
  public errorUrl:string = null;
}
