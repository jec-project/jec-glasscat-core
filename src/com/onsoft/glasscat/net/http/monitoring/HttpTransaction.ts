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

import {GuidGenerator} from "jec-commons";

/**
 * Represents an HTTP transaction in the GlassCat architecture.
 */
export class HttpTransaction {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>HttpTransaction</code> instance.
   */
  constructor(url:string) {
    this.init(url);
  }

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   * 
   * @param {string} url the URL for this HTTP transaction.
   */
  private init(url:string):void {
    let generator:GuidGenerator = new GuidGenerator();
    this._initialTimestamp = Date.now();
    this._id = generator.generate();
    this._url = url;
  }

  ////////////////////////////////////////////////////////////////////////////
  // Private properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The GUID for this HTTP transaction.
   */
  private _id:string = null;

  /**
   * The URL for this HTTP transaction.
   */
  private _url:string = null;

  /**
   * The starting time of this HTTP transaction.
   */
  private _initialTimestamp:number = 0;

  /**
   * The ending time of this HTTP transaction.
   */
  private _finalTimestamp:number = 0;

  /**
   * A boolean value that indicates whether this HTTP transaction is closed
   * (<code>true</code>), or not (<code>false</code>).
   */
  private _closed:boolean = false;

  /**
   * A boolean value that indicates whether the transaction has succeeded
   * (<code>true</code>), or not (<code>false</code>).
   */
  private _success:boolean = true;

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Returns the starting time of this HTTP transaction.
   * 
   * @return {number} the starting time of this HTTP transaction.
   */
  public getInitialTimestamp():number {
    return this._initialTimestamp;
  }

  /**
   * Returns the ending time of this HTTP transaction.
   * 
   * @return {number} the ending time of this HTTP transaction.
   */
  public getFinalTimestamp():number {
    return this._finalTimestamp;
  }

  /**
   * Returns the URL for this HTTP transaction.
   * 
   * @return {string} the URL for this HTTP transaction.
   */
  public getUrl():string {
    return this._url;
  }

  /**
   * Returns the GUID for this HTTP transaction.
   * 
   * @return {string} the GUID for this HTTP transaction.
   */
  public getId():string {
    return this._id;
  }

  /**
   * Returns a boolean value that indicates whether this HTTP transaction is
   * closed (<code>true</code>), or not (<code>false</code>).
   * 
   * @return {boolean} <code>true</code> whether this HTTP transaction is 
   *                   closed; <code>false</code> otherwise.
   */
  public isClosed():boolean {
    return this._closed;
  }

  /**
   * Returns a boolean value that indicates whether the transaction has 
   * succeeded (<code>true</code>), or not (<code>false</code>).
   * 
   * @return {string} <code>true</code> whether this HTTP transaction has 
   *                  succeeded; <code>false</code> otherwise.
   */
  public getSuccess():boolean {
    return this._success;
  }

  /**
   * Marks this HTTP transaction as closed.
   * 
   * @param {boolean} success indicates whether the transaction has succeeded
   *                          (<code>true</code>), or not(<code>false</code>).  
   */
  public close(success:boolean):void {
    this._finalTimestamp = Date.now();
    this._closed = true;
    this._success = success;
  }

  /*
   * @override
   */
  public toString():string {
    let s:string = "[Object::HttpTransaction: guid=" + this._id +
       ", url=" + this._url + ", initialTimestamp=" + this._initialTimestamp +
       ", finalTimestamp=" + this._finalTimestamp + ", closed=" + this._closed +
       ", success=" + this._success + "]";
    return s;
  }
}