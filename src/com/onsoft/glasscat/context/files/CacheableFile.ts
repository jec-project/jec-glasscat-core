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

import {FileProperties} from "jec-commons";

/**
 * A simple DTO that is used to store <code>FileProperties</code> instances in
 * the cache of a <code>SourceFileInspector</code> object.
 */
export class CacheableFile {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>CacheableFile</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // Public properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The reference to the <code>FileProperties</code> instance to store in
   * cache.
   */
  public file:FileProperties = null;

  /**
   * The source path associated with the <code>FileProperties</code> instance to 
   * store in cache.
   */
  public sourcePath:string = null;
}
