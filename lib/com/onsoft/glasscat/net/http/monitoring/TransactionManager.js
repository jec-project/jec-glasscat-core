"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpTransaction_1 = require("./HttpTransaction");
class TransactionManager {
    constructor() {
        this._transactionMonitor = null;
        this._transactionMap = null;
        this.init();
    }
    init() {
        this._transactionMap = new Map();
    }
    getTransactionMonitor() {
        return this._transactionMonitor;
    }
    setTransactionMonitor(transactionMonitor) {
        this._transactionMonitor = transactionMonitor;
    }
    openTransaction(req, res) {
        let transaction = new HttpTransaction_1.HttpTransaction(req.originalUrl);
        let id = transaction.getId();
        res.locals.transactionId = id;
        this._transactionMap.set(id, transaction);
    }
    closeTransaction(req, res) {
        let locals = res.locals;
        let id = locals.transactionId;
        let transaction = this._transactionMap.get(id);
        transaction.close(!locals.transactionFails);
        this._transactionMonitor.send(transaction);
        this._transactionMap.delete(id);
    }
}
exports.TransactionManager = TransactionManager;
;
