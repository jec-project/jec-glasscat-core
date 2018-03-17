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

import * as UrlPattern from "url-pattern";

/**
 * The <code>RoutePattern</code> class provides utilities for matching url
 * patterns.
 */
export class RoutePattern {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>RoutePattern</code> instance.
   * 
   * @param {string} pattern the URL pattern associated with this 
   *                         <code>RoutePattern</code> instance.
   */
  constructor(pattern:string) {
    this.init(pattern);
  }

  ////////////////////////////////////////////////////////////////////////////
  // Private properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The <code>UrlPattern</code> object responsible for matching URL patterns.
   */
  private _pattern:UrlPattern = null;
  
  /**
   * The <code>UrlPattern</code> object identifier.
   */
  private _name:string = null;

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   *
   * @param {string} pattern the URL pattern associated with this 
   *                         <code>RoutePattern</code> instance.
   */
  private init(pattern:string):void {
    this._pattern = new UrlPattern(pattern);
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Returns the name of this <code>RoutePattern</code> instance.
   *
   * @return {string} the name of this <code>RoutePattern</code> instance.
   */
  public getName():string {
    return this._name;
  }

  /**
   * Sets the name of this <code>RoutePattern</code> instance.
   *
   * @param {string} name the name of this <code>RoutePattern</code> instance.
   */
  public setName(name:string):void {
    this._name = name;
  }

  /**
   * Tests whether the specified URL matches this route, or not, and processes 
   * the <code>success</code>, or <code>fails</code> callback functions,
   * depending on the result of the operation.
   *
   * @param {string} url the URL to test.
   * @param {Function} success handles the result of the operation whether the
   *                           specified URL matches this route. This methods
   *                           takes one parameter which contains the result of
   *                           the operation.
   * @param {Function} fail handles the result of the operation whether the
   *                        specified URL does not matche this route.
   */
  public match(url:string, success:(result:any)=>void, fail:()=>void):void {
    const result:any = this._pattern.match(url);
    if(result) success(result);
    else fail();
  }
  
  /**
   * Returns a boolean that indicates whether the specified URL matches this
   * route (<code>true</code>), or not (<code>false</code>).
   *
   * @param {string} url the URL to test.
   * @return {boolean} <code>true</code> whether the specified URL matches this 
   *                   route; <code>false</code> otherwise.
   */
  public test(url:string):boolean {
    return this._pattern.match(url) ? true : false;
  }
  
  /**
   * Returns an object that represents the route parameters whether the
   * specified URL matches this route, or <code>undefined</code> if the URL does 
   * not match this route.
   *
   * @param {string} url the URL to test.
   * @return {any} the route parameters of the specified URL, or
   *               <code>undefined</code>.
   */
  public exec(url:string):any {
    return this._pattern.match(url);
  }
  
  /*
   * Returns a string that represents 
   *
   * @method stringify
   * @param {any} values .
   * @return {string} 
   
  public stringify(values?:any):string {
    return this._pattern.stringify(values);
  }*/
}
