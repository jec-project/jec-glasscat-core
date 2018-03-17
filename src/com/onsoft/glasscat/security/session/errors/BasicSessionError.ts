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

import {SessionId, SessionError, SessionErrorType} from "jec-exchange";

/**
 * A data transfert object for managing session errors.
 */
export class BasicSessionError implements SessionError {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this <code>BasicSessionError</code> instance.
   * 
   * @param {SessionId} sessionId the ID of the session that throws the error.
   * @param {SessionErrorType} errorType the type of the session error.
   * @param {string} message a string that contains the details of the session
   *                         error.
   */
  constructor(sessionId:SessionId, errorType:SessionErrorType,
                                                              message?:string) {
    this.initObj(sessionId, errorType, message);
  }
  
  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The ID of the session that throws the error.
   */
  private _sessionId:SessionId = null;

  /**
   * Indicates the type of this session error.
   */
  private _errorType:SessionErrorType = null;
  
  /**
   * A string that contains the details of the session error.
   */
  private _message:string = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   * 
   * @param {SessionId} sessionId the ID of the session that throws the error.
   * @param {SessionErrorType} errorType the type of the session error.
   * @param {string} message a string that contains the details of the session
   *                         error.
   */
  private initObj(sessionId:SessionId, errorType:SessionErrorType,
                                                         message?:string):void {
    this._sessionId = sessionId;
    this._errorType = errorType;
    this._message = message;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public getSessionId():SessionId {
    return this._sessionId;
  }

  /**
   * @inheritDoc
   */
  public getErrorType():SessionErrorType {
    return this._errorType;
  }
  
  /**
   * @inheritDoc
   */
  public getMessage():string {
    return this._message;
  }

  /*
   * @override
   */
  public toString():string {
    const result:string = "[Object::SessionError: sessionId=" +
                         this._sessionId.getId() + " errorType=" +
                         this._errorType + " message=" + this._message + "]";
    return result;
  }
}