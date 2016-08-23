'use strict';

const logger = require('../logger');
const config = require('../config');
const MongoClient = require('mongodb').MongoClient;

let activeConnection;
const returnConnection = new Promise((ok, ko) => {
	if (activeConnection) {
		return ok(activeConnection);
	}

	MongoClient.connect(config.DB_URI, (err, db) => {
		if (err) {
			logger.error(`Error when try to connect to DB: ${err}`, {transactionId: 'db_start'});
			return ko(err);
		}
		logger.info('connected to database', {transactionId: 'db_start'});

		db.on('error', err => {
			logger.error(`db error: ${JSON.stringify(err)}`, {transactionId: 'db_error'});
		});

		db.on('close', () => {
			logger.warn('db closed', {transactionId: 'db_close'});
		});

		db.on('reconnect', () => {
			logger.warn('db reconnect', {transactionId: 'db_reconnect'});
		});

		db.on('timeout', err => {
			logger.error(`db timeout: ${JSON.stringify(err)}`, {transactionId: 'db_timeout'});
		});

		db.collection('test').count((err, count) => {
			if (err) {
				logger.error('Error when try to count "test" collection', {transactionId: 'db_start'});
				return ko(err);
			}
			logger.info(`${count} elements found on database`, {transactionId: 'db_start'});
		});

		activeConnection = db;
		ok(activeConnection);
	});

});

module.exports = () => returnConnection;
