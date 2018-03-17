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
        const transaction = new HttpTransaction_1.HttpTransaction(req.originalUrl);
        const id = transaction.getId();
        res.locals.transactionId = id;
        this._transactionMap.set(id, transaction);
    }
    closeTransaction(req, res) {
        const locals = res.locals;
        const id = locals.transactionId;
        const transaction = this._transactionMap.get(id);
        transaction.close(!locals.transactionFails);
        this._transactionMonitor.send(transaction);
        this._transactionMap.delete(id);
    }
}
exports.TransactionManager = TransactionManager;
;
