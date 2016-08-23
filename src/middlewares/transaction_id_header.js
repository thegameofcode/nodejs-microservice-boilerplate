'use strict';

const logger = require('../logger');

module.exports = (req, res, next) => {
	const transactionIdHeader = req.headers['x-transaction-id'];
	if (!transactionIdHeader) {
		logger.warn(`no transaction id on request ${req.method} ${req.url}`, {transactionId: 'no_transaction_id'});
	}
	req.transactionId = transactionIdHeader;
	next();
};
