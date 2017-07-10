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

import {SessionId} from "jec-exchange";

/**
 * The <code>GlassCatSessionId</code> class represents a session identifier for 
 * a GlassCat application.
 * 
 * @param {string} id the session GUID for this <code>GlassCatSessionId</code> instance.
 */
export class GlassCatSessionId implements SessionId {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this <code>SecurityRole</code> instance.
   * 
   * @param {string} id the session GUID for this <code>GlassCatSessionId</code>
   *                    instance. 
   */
  constructor(id:string) {
    this._id = id;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The session GUID for this <code>SessionId</code> object.
   */
  private _id:string = null;

  //////////////////////////////////////////////////////////////////////////////
  // Public accessors
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public getId():string {
    return this._id;
  };

  //////////////////////////////////////////////////////////////////////////////
  // Public properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public authurl:string = null;
}