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
 * A Data Transfert Object used to store an share configuration paths for 
 * creating files templates.
 */
export class TemplatePaths {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>TemplatePaths</code> instance.
   */
  constructor() {}
  
  //////////////////////////////////////////////////////////////////////////////
  // Public properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The reference to the full path to a project directory.
   */
  public projectPath:string = null;

  /**
   * The pattern used to create reference to the GlassCat <code>src</code>
   * folder.
   */
  public relativePathPattern:string = null;

  /**
   * The reference path to the directory where to create the file.
   */
  public directoryPath:string = null;

  /**
   * The full path reference for the file to create.
   */
  public filePath:string = null;
};
