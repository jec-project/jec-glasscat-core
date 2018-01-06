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

import {Logger} from "jec-commons";
import {LoggerContext} from "../../context/LoggerContext";

/**
 * The base interface for all logger factories of GlassCat containers.
 */
export interface LoggerFactory {

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Builds and returns a new <code>Logger</code> instance.
   *
   * @param {LoggerContext} context the context used to create the new
   *                                <code>Logger</code> instance.
   * @return a new <code>Logger</code> instance.
   */
  build(context:LoggerContext):Logger;
};
