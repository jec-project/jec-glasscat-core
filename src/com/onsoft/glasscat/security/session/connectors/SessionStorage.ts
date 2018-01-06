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

import {Session, SessionId, SessionError} from "jec-exchange";

/**
 * The <code>SessionStorage</code> interface provides the API for connectors 
 * that are used to persist sessions data.
 */
export interface SessionStorage {

  /**
   * Adds a new session to the session storage.
   *
   * @param {Session} session the session to add.
   * @param {Function} result the callback method used to handle the result of
   *                          the operation. When the operation has failed,
   *                          the <code>result()</code> methods takes a 
   *                          <code>SessionError</code> object as parameter.
   */
  add(session:Session, result:(error?:SessionError)=>any):void;

  /**
   * Retreives a session specified by it's ID from the session storage.
   * 
   * @param {SessionId} sessionId the ID of the session to retreive.
   * @param {Function} success the callback method used to handle the result of
   *                           the operation. the <code>success()</code> methods 
   *                           takes a <code>Session</code> object as parameter.
   * @param {Function} error the callback method used to handle the result of
   *                         the operation when it has faild. The 
   *                         <code>error()</code>  methods takes a 
   *                         <code>SessionError</code> object as parameter.
   */
  get(sessionId:SessionId, success:(session:Session)=>any,
                           error:(error:SessionError)=>any):void;

  /**
   * Removes a session specified by it's ID from the session storage.
   * 
   * @param {SessionId} sessionId the ID of the session to remove.
   * @param {Function} result the callback method used to handle the result of
   *                          the operation. When the operation has failed,
   *                          the <code>result()</code> methods takes a 
   *                          <code>SessionError</code> object as parameter.
   */
  remove(sessionId:SessionId, result:(error?:SessionError)=>any):void;
}