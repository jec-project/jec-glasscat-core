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

import {Session, SessionError, SessionErrorType, SessionId} from "jec-exchange";
import {SessionStorage} from "./SessionStorage";
import {SessionErrorBuilder} from "../utils/SessionErrorBuilder";

/**
 * A basic in-memory implementation of the <code>SessionStorage</code>
 * interface.
 */
export class LocalSessionStorage implements SessionStorage {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>LocalSessionStorage</code> instance.
   */
  constructor() {
    this.initObj();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * An in-memory sessions cache.
   */
  private _sessionMap:Map<string, Session> = null;

  /**
   * The timestamp reference to the timer used to delete obsolete sessions.
   */
  private _sessionMapTimer:number = -1;

  /**
   * The interval used by the timer which deletes obsolete sessions.
   */
  private _sessionMapTimerInterval:number = 60*60*1000;

  /**
   * The reference to the <code>SessionErrorBuilder</code> instance for this
   * object.
   */
  private _sessionErrorBuilder:SessionErrorBuilder = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this session storage manager.
   */
  private initObj():void {
      this._sessionMap = new Map<string, Session>();
      this._sessionErrorBuilder = new SessionErrorBuilder();
  }

  /**
   * Checks all registered sessions to remove obsolete ones.
   */
  private invalidateSessionMap():void {
    let time:number = 0;
    this._sessionMap.forEach(
      (value:Session) => {
        time = Date.now();
        if(time < value.expires) {
          this._sessionMap.delete(value.sessionId.getId());
        }
      }
    )
    this.checkSessionMapSize();
  }

  /**
   * Stops the obsolete session timers whether the session map is empty.
   */
  private checkSessionMapSize():void {
    if(this._sessionMap.size === 0) {
      clearInterval(this._sessionMapTimer);
      this._sessionMapTimer = -1;
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////
  
  /**
   * @inheritDoc
   */
  public add(session:Session, result:(error?:SessionError)=>any):void {
    this._sessionMap.set(session.sessionId.getId(), session);
    if(this._sessionMapTimer === -1) {
      this._sessionMapTimer = setInterval(
        this.invalidateSessionMap.bind(this),
        this._sessionMapTimerInterval
      );
    }
    result();
  }

  /**
   * @inheritDoc
   */
  public get(sessionId:SessionId, success:(session:Session)=>any,
                                  error:(error:SessionError)=>any):void {
   let session:Session = this._sessionMap.get(sessionId.getId());
   if(session) success(session);
   else {
     error(
       this._sessionErrorBuilder.build(
         sessionId, SessionErrorType.INVALID_SESSION_ID
        )
     );
   }
  }

  /**
   * @inheritDoc
   */
  public remove(sessionId:SessionId, result:(error?:SessionError)=>any):void {
    let id:string = sessionId.getId();
    let exists:boolean = this._sessionMap.has(id);
    if(exists) {
      this._sessionMap.delete(id);
      result();
    } else {
      result(
        this._sessionErrorBuilder.build(
          sessionId, SessionErrorType.INVALID_SESSION_ID
        )
      );
    }
    if(this._sessionMapTimer !== -1) this.checkSessionMapSize();
  }

  /*
   * @private
   * 
   * Forces to remove all expired sessions from the session map.
   */
  public clearExpired():void {
    this.invalidateSessionMap();
  }
}