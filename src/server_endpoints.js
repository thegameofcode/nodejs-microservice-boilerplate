'use strict';

const config = require('./config');

module.exports = server => {
	server.get('/v', (req, res, next) => {
		res.send(200, {v:config.VERSION});
		return next();
	});
	server.post('/api/players', require('./players/create_endpoint'));
	server.get('/api/players', require('./players/find_endpoint'));
};
