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

import {LoggerManager} from "../../../util/logging/LoggerManager";
import {LocaleManager} from "../../../i18n/LocaleManager";
import * as express from "express";
import {HttpTransaction} from "./HttpTransaction";
import {TransactionMonitor} from ".//TransactionMonitor";

/**
 * The manager for monitoring transactions over the current GlassCat server.
 */
export class TransactionManager {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>TransactionManager</code> instance.
   */
  constructor() {
    this.init();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The transaction monitor object for this manager.
   */
  private _transactionMonitor:TransactionMonitor = null;

  /**
   * The collection of opened HTTP transactions for the associated GlassCat
   * server.
   */
  private _transactionMap:Map<string, HttpTransaction> = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this transaction manager.
   */
  private init():void {
    this._transactionMap = new Map<string, HttpTransaction>();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Returns the transaction monitor object for this manager.
   * 
   * @return {TransactionMonitor} the transaction monitor object for this
   *                              manager.
   */
  public getTransactionMonitor():TransactionMonitor {
    return this._transactionMonitor;
  }

  /**
   * Sets the transaction monitor object for this manager.
   * 
   * @param {TransactionMonitor} transactionMonitor the new transaction monitor
   *                                                object for this manager.
   */
  public setTransactionMonitor(transactionMonitor:TransactionMonitor):void {
    this._transactionMonitor = transactionMonitor;
  }

  /**
   * Opens the HTTP transaction for the specified HTTP request.
   *
   * @param {express.Request} req the HTTP request for the current HTTP
   *                              transaction.
   * @param {express.Response} res the HTTP response for the current HTTP
   *                               transaction.
   */
  public openTransaction(req:express.Request, res:express.Response):void {
    let transaction:HttpTransaction = new HttpTransaction(req.originalUrl);
    let id:string = transaction.getId();
    res.locals.transactionId = id;
    this._transactionMap.set(id, transaction);
  }
  
  /**
   * Closes the HTTP transaction for the specified HTTP request.
   *
   * @param {express.Request} req the HTTP request for the current HTTP
   *                              transaction.
   * @param {express.Response} res the HTTP response for the current HTTP
   *                              transaction.
   */
  public closeTransaction(req:express.Request, res:express.Response):void {
    let locals:any = res.locals;
    let id:string = locals.transactionId;
    let transaction:HttpTransaction = this._transactionMap.get(id);
    transaction.close(!locals.transactionFails);
    this._transactionMonitor.send(transaction);
    this._transactionMap.delete(id);
  }
};
