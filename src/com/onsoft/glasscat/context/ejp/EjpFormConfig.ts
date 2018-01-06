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
 * Represents the form configuration for an EJP deployed in a GlassCat container.
 */
export class EjpFormConfig {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>EjpFormConfig</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Public properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The URL used to specify the authentication form resource.
   */
  public loginUrl:string = null;
  
  /**
   * The URL used to specify the authentication error resource.
   */
  public errorUrl:string = null;
}
