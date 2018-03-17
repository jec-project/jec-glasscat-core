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

import {HttpTransaction} from "./HttpTransaction";
import {TransactionMonitor} from "./TransactionMonitor";

/**
 * Creates a basic <code>TransactionMonitor</code> implementation wich sends all 
 * messages to the console.
 */
export class ConsoleTransactionMonitor implements TransactionMonitor {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>ConsoleTransactionMonitor</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public send(transaction:HttpTransaction):void {
    const time:number =
            transaction.getFinalTimestamp() - transaction.getInitialTimestamp();
    const msg:string = "[Transaction: url=" + transaction.getUrl() 
      + ", success=" + transaction.getSuccess() + ", duration=" + time + " ms]";
    console.log(msg);
  }
}