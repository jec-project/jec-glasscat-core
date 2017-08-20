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

import {MappedPathUtil} from "./MappedPathUtil";
import {TemplatePaths} from "./TemplatePaths";
import {JecStringsEnum, UrlStringsEnum} from "jec-commons";

/**
 * A helper class that is used to resolve configuration paths for creating
 * GlassCat commands that build files templates.
 */
export class TemplatePathsSolver {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>TemplatePathsSolver</code> instance.
   */
  constructor() {}
  
  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Represents the path to the default workspace.
   */
  private static readonly WORKSPACE_PATH:string = "${root}/workspace/";

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates and returns a well formated template path for the specified
   * <code>path</code> property.
   * 
   * @param {string} path the path to fix.
   *
   * @return {string} a well formated template path for the specified 
   *                  <code>path</code> property.
   */
  private fixFilePath(path:string):string {
    let result:string = path;
    let id:number = -1;
    let len:number = 0;
    if(path) {
      len = result.length;
      if(len > 1 && path.indexOf(UrlStringsEnum.SLASH) === 0)  {
        result = result.substr(1);
      }
      id = result.lastIndexOf(UrlStringsEnum.SLASH);
      if(id !== len) result += UrlStringsEnum.SLASH;
    } else result = UrlStringsEnum.SLASH;
    return result;
  }

  /**
   * Creates and returns the GlassCat <code>src</code> relative path reference
   * for the template file to create.
   * 
   * @param {string} path the fixed template file path.
   *
   * @return {string} the GlassCat <code>src</code> relative path reference for 
   *                  the template file to create.
   */
  private resolveRelativePath(path:string):string {
    let count:number = this.countOccurrences(path, UrlStringsEnum.SLASH) + 3;
    let result:string = UrlStringsEnum.EMPTY_STRING;
    while(count--) {
      result += UrlStringsEnum.RELATIVE_PATH;
    }
    return result;
  }

  /**
   * Solves and returns the directory path of the project for which to create
   * the template file.
   * 
   * @param {string} project the project directory name.
   *
   * @return {string} the directory path of the project for which to create the
   *                  template file.
   */
  private resolveProjectPath(project:string):string {
    let projectPath:string = TemplatePathsSolver.WORKSPACE_PATH + project;
    return MappedPathUtil.getInstance().resolve(projectPath);
  }

  /**
   * Solves and returns the directory path where to create the template file.
   * 
   * @param {string} projectPath the project directory for which to create the
   *                             template file.
   * @param {string} path the fixed template file path.
   *
   * @return {string} the directory path where to create the template file.
   */
  private resolveDirPath(projectPath:string, path:string):string {
    let dirPath:string = projectPath + JecStringsEnum.SRC + path;
    return dirPath;
  }

  /**
   * Solves and returns the path to the template file.
   * 
   * @param {string} dirPath the fixed directory path.
   * @param {string} fileName the name of the template file.
   * @param {string} fileName the template file extention.
   *
   * @return {string} the path to the template file.
   */
  private resolveFilePath(dirPath:string, fileName:string,
                                                      extention:string):string {
    let filePath:string = dirPath + fileName + UrlStringsEnum.DOT + extention;
    return filePath;
  }

  /**
   * Counts and returns the number of occurrences of a sub string in a string.
   * 
   * @param {string} string               the string for which to search the
   *                                      sub string occurrences
   * @param {string} subString            the sub string to search for.
   *
   * @return {number} the number of occurrences of the sub string in the string.
   * 
   * @author Vitim.us https://gist.github.com/victornpb/7736865
   * @see Unit Test https://jsfiddle.net/Victornpb/5axuh96u/
   * @see http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string/7924240#7924240
   */
  private countOccurrences(string:string, subString:string,
                                      allowOverlapping:boolean = false):number {
    //string += "";
    //subString += "";
    if (subString.length <= 0) return (string.length + 1);
    let n:number = 0;
    let pos:number = 0;
    let step:number = allowOverlapping ? 1 : subString.length;
    while(true) {
      pos = string.indexOf(subString, pos);
      if(pos >= 0) {
          ++n;
          pos += step;
      } else break;
    }
    return n;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Processes the specified properties, that define a template and, returns a
   * new <code>TemplatePaths</code> instance which contains all fixed path
   * properties.
   * 
   * @param {string} fileName the template name.
   * @param {string} fileName the template file extension.
   * @param {string} projectPath the project directory for which to create a
   *                             template.
   * @param {string} filePath the path to the template file whithin the project
   *                          directory.
   * @return {TemplatePaths} the new <code>TemplatePaths</code> instance.
   */
  public resolve(fileName:string, fileExtension:string, projectPath:string,
                                                filePath:string):TemplatePaths {
    let resolved:TemplatePaths = new TemplatePaths();
    let fixedPath:string = this.fixFilePath(filePath);
    let fixedProjectPath:string = this.resolveProjectPath(projectPath);
    let dirPath:string = null;
    resolved.projectPath = fixedProjectPath;
    resolved.relativePathPattern = this.resolveRelativePath(fixedPath);
    dirPath = this.resolveDirPath(fixedProjectPath, fixedPath);
    resolved.directoryPath = dirPath;
    resolved.filePath = this.resolveFilePath(dirPath, fileName, fileExtension);
    return resolved;
  }
};
