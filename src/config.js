'use strict';

const fs = require('fs');

let config = {};

try {
	fs.accessSync(`${process.cwd()}/src/config.json`);
	config = require('./config.json');
}
catch(err){
	process.stdout.write(`[WARN] ${process.cwd()}/config.json file does not exist`);
	config = {};
}

module.exports = {
	VERSION : `1.0.${process.env.BUILD}` || '1.0.no-build',
	PORT : process.env.PORT || config.PORT,
	DB_URI : process.env.DB_URI || config.DB_URI,
	PAPERTRAIL_HOST : process.env.PAPERTRAIL_HOST || config.PAPERTRAIL_HOST,
	PAPERTRAIL_PORT : process.env.PAPERTRAIL_PORT || config.PAPERTRAIL_PORT
};
