'use strict';

const logger = require('../logger');

module.exports = (req, res, next) => {
	if (!req.userId) {
		logger.warn(`no userId on request ${req.method} ${req.url}`, req);
	}
	next();
};
