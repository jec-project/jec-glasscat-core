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
 * A helper class that is used by the <code>ContextRootUtil</code> class to 
 * share information about a specific context root.
 */
export class ContextRootData {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>ContextRootData</code> instance.
   */
  constructor() {};
  
  //////////////////////////////////////////////////////////////////////////////
  // Public properties
  //////////////////////////////////////////////////////////////////////////////
  
  /**
   * Indicates whether the specified path contains a nested resource that must
   * use the <code>ResourceProxy</code> class to be loaded (<code>true</code>),
   * or not (<code>false</code>).
   */
  public containsNestedResource:boolean = false;

  /**
   * Indicates whether the specified URL path needs set for redirecting the
   * HTTP transaction (<code>true</code>), or not (<code>false</code>).
   */
  public needsRedirection:boolean = false;

  /**
   * The new path to be used for rewriting the URL path when
   * <code>needsRedirection</code> is <code>true</code>.
   */
  public newPath:string = null;

  /**
   * The context root associated with this <code>ContextRootData</code> object.
   */
  public contextRoot:string = null;

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Resets all properties for this <code>ContextRootData</code> object.
   */
  public reset():void {
    this.needsRedirection = this.containsNestedResource = false;
    this.newPath = null;
    this.contextRoot = null;
  }
  
  /**
   * @private
   */
  public toString():string {
    return "[Object::ContextRootData: contextRoot=" + this.contextRoot +
           ", needsRedirection=" + this.needsRedirection + ", newPath=" +
           this.newPath + ", containsNestedResource=" +
           this.containsNestedResource + "]";
  }
}