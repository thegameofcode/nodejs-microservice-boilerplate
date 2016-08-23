'use strict';

const config = require('./config');
const httpServer = require('./server');
const logger = require('./logger');

httpServer
	.start(config.PORT)
	.then(server => {
		logger.info(`service listening on ${server.url}`, {transactionId: 'service_start'});
	})
	.catch(error => {
		logger.info(`error stating service: ${error}`, {transactionId: 'service_start'});
	});
