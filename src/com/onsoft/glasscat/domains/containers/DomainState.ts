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
 * The <code>DomainState</code> class provides a collection of constant values 
 * that specify the state of a JEC domain container.
 * 
 * TODO: this class should be a part of the jec-commons package.
 */
export class DomainState {

  //////////////////////////////////////////////////////////////////////////////
  // Public constants
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Indicates that a GlassCat container is <code>stateless</code>.
   */
  public static readonly STATELESS:string = "stateless";

  /**
   * Indicates that a GlassCat container is <code>stateful</code>.
   */
  public static readonly STATEFUL:string = "stateful";
}