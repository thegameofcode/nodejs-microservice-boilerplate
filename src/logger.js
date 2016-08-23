'use strict';

const os = require('os');
const winston = require('winston');
const papertrail = require('winston-papertrail').Papertrail;
const semver = require('semver');
const config = require('./config');

const consoleLogger = new winston.transports.Console({
	level: 'error',
	timestamp: () => {
		return new Date().toISOString();
	},
	colorize: false
});

const version = semver.valid(config.VERSION) ? semver.patch(config.VERSION) : 'dev';

const ptTransport = new papertrail({
	host: config.PAPERTRAIL_HOST,
	port: config.PAPERTRAIL_PORT,
	hostname: os.hostname(),
	program: `players-${version}`,
	level: 'error',
	logFormat: (level, message) => {
		return `[${level}] ${message}`;
	},
	handleExceptions: false,
	colorize: true,
	inlineMeta: true
});

ptTransport.on('error', function (err) {
	if (logger) logger.error(err, {transactionId: 'papertrail'});
});

ptTransport.on('connect', function (message) {
	if (logger) logger.info(message, {transactionId: 'papertrail'});
});

const logger = new winston.Logger({
	levels: {
		debug: 0,
		info: 1,
		warn: 2,
		error: 3
	},
	transports: [
		ptTransport,
		consoleLogger
	],
	rewriters: [
		(level, message, meta) => {
			if (!meta.transactionId) {
				meta.transactionId = 'transactionId required on log';
			}

			return {
				transactionId: meta.transactionId
			};
		}
	]
});

module.exports = logger;
