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

import {Session, SessionError, SessionId} from "jec-exchange";
import {SessionStorage} from "../connectors/SessionStorage";

/**
 * The <code>SessionManager</code> interface provides the API for managing 
 * session information in a GlassCat domain container.
 */
export interface SessionManager {

  /**
   * Returns the <code>SessionStorage</code> instance for this session manager.
   *
   * @return {SessionStorage} the <code>SessionStorage</code> instance for this 
   *                          session manager.
   */
  getSessionStorage():SessionStorage;

  /**
   * Sets the <code>SessionStorage</code> instance for this session manager.
   *
   * @param {SessionStorage} sessionStorage the new <code>SessionStorage</code>  
   *                                        instance for this session manager.
   */
  setSessionStorage(sessionStorage:SessionStorage):void;
  
  /**
   * Creates and returns a new session ID.
   *
   * @return {SessionId} a <code>SessionId</code> object that represents a new
   *                     session ID.
   */
  initSessionId():SessionId;

  /**
   * Adds a new session to the session storage.
   *
   * @param {Session} session the session to add.
   * @param {Function} result the callback method used to handle the result of
   *                          the operation. When the operation has failed,
   *                          the <code>result()</code> methods takes a 
   *                          <code>SessionError</code> object as parameter.
   */
  addSession(session:Session, result:(error?:SessionError)=>any):void;

  /**
   * Returns the <code>Session</code> instance with the specified session ID.
   *
   * @param {SessionId} sessionId the ID of the session to retreive.
   * @param {Function} success the callback method used to handle the result of
   *                           the operation. the <code>success()</code> methods 
   *                           takes a <code>Session</code> object as parameter.
   * @param {Function} error the callback method used to handle the result of
   *                         the operation when it has faild. The 
   *                         <code>error()</code> methods takes a 
   *                         <code>SessionError</code> object as parameter.
   */
  getSession(sessionId:SessionId, success:(session:Session)=>any,
                                  error:(error:SessionError)=>any):void;

  /**
   * Removes the specified session from the session storage.
   *
   * @param {SessionId} sessionId the ID of the session to remove.
   * @param {Function} result the callback method used to handle the result of
   *                          the operation. When the operation has failed,
   *                          the <code>result()</code> methods takes a 
   *                          <code>SessionError</code> object as parameter.
   */
  removeSession(sessionId:SessionId, result:(error?:SessionError)=>any):void;
}