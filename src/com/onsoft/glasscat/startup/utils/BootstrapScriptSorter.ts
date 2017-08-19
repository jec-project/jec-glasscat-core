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

import {BootstrapScript} from "jec-commons";

/**
 * A helper class for sorting collections of EJP configuration bootstrap
 * classes.
 */
export class BootstrapScriptSorter {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>BootstrapScriptSorter</code> instance.
   */
  constructor() {}
  
  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The function that is used to compare the specified objects.
   *
   * @param {BootstrapScript} obj1 the first object to compare.
   * @param {BootstrapScript} obj2 the second object to compare.
   * @return {number} a number that indicates the sort order for the specified
   *                  objects.
   */
  private sortFunction(obj1:any, obj2:any):number {
    //let a:number = obj1.getPriority();
    //let b:number = obj2.getPriority();
    let a:number = obj1.__priority;
    let b:number = obj2.__priority;
    if(a === null || a === undefined && b === null || b === undefined) return 0;
    else if(a === null || a === undefined) return -1;
    else if(b === null || b === undefined) return 1;
    else if(a > b) return -1;
    else if(a < b) return 1;
    return 0;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Sorts the specified collection from higher to lower IDs.
   *
   * @param {Array<BootstrapScript} bootstrapCollection the collection to sort.
   */
  public sortCollection(bootstrapCollection:BootstrapScript[]):void {
    bootstrapCollection.sort(this.sortFunction);
  }
}