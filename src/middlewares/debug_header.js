'use strict';

const logger = require('../logger');

module.exports = (req, res, next) => {
	const debugHeader = req.headers['x-debug'];
	if (debugHeader === 'true') {
		logger.debug('debug header enabled for request', req);
		req.debug = true;
	}
	next();
};
