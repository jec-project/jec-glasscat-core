"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConsoleTransactionMonitor {
    constructor() { }
    send(transaction) {
        let time = transaction.getFinalTimestamp() - transaction.getInitialTimestamp();
        let msg = "[Transaction: url=" + transaction.getUrl() + ", success="
            + transaction.getSuccess() + ", duration=" + time + " ms]";
        console.log(msg);
    }
}
exports.ConsoleTransactionMonitor = ConsoleTransactionMonitor;
