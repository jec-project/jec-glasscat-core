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

import {SecurityConstraint} from "jec-exchange";
import {BasicSecurityConstraint} from "../core/BasicSecurityConstraint";
import {EjpConstraintConfig} from "../../context/ejp/EjpConstraintConfig";

/**
 * A helper class that builds and returns object that implement the
 * <code>SecurityConstraint</code> interface.
 */
export class SecurityConstraintBuilder {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>SecurityConstraintBuilder</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public methpds
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Builds and returns a new <code>SecurityConstraintBuilder</code> instance, 
   * for the specified context.
   * 
   * @param {EjpConstraintConfig} context the context for the new 
   *                                      <code>SecurityConstraint</code> instance.
   * @return {StaticResources} a new <code>SecurityConstraintBuilder</code>
   *                           instance.
   */
  public build(context:EjpConstraintConfig):SecurityConstraint {
    const constraint:SecurityConstraint = new BasicSecurityConstraint(context);
    return constraint;
  }
}