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
 * The <code>HttpStatusReport</code> class represents a HTTP status report.
 */
export class HttpStatusReport {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>HttpStatusReport</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Public properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The title for the HTTP status report.
   */
  public title:string = null;
  
  /**
   * The title for the HTTP status report.
   */
  public type:string = "Status report";

  /**
   * The message for the HTTP status report.
   */
  public message:string = null;
  
  /**
   * The description for the HTTP status report.
   */
  public description:string = null;
  
  /**
   * The current version of the GlassCat container.
   */
  public version:string = null;

  /**
   * The status of the HTTP request for this status report.
   */
  public status:number = 0;

  /**
   * The code name for the current version of the GlassCat container.
   */
  public codeName:string = null;

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * @private
   */
  public toString():string {
    return "[Object::HttpStatusReport: title=" + this.title
            + ", type=" + this.type + ", message=" + this.description
            + ", version=" + this.version + ", codeName=" + this.codeName
            + ", message=" + this.description + ", status=" + this.status + "]";
  }
}