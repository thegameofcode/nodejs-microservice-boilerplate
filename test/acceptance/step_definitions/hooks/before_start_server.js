'use strict';

const server = require('../../../../src/server');
const logger = require('../../../../src/logger');
const config = require('../../../../src/config');

module.exports = function (){

	this.Before(()=>{
		const port = 3000;
		this.world = {
			host : `http://localhost:${port}`
		};

		logger.info(`starting test with config ${JSON.stringify(config)}`);

		return server
				.start(port)
				.then(server => {
					logger.info(`service listening on ${server.url}`, {transactionId: 'service_start'});
				})
				.catch(error => {
					logger.info(`error stating service: ${error}`, {transactionId: 'service_start'});
				});
	});

};
