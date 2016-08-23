'use strict';

const restify = require('restify');

const logger = require('./logger');

const server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(require('./middlewares/transaction_id_header'));
server.use(require('./middlewares/ensure_user_id'));
server.use(require('./middlewares/debug_header'));

server.on('after', (req, res, route, err) => {
	if (err) {
		return logger.error(`${req.method} ${req.url} ${res.statusCode} route:${JSON.stringify(route)} err:${err}`, req);
	}
	logger.info(`${req.method} ${req.url} ${res.statusCode}`, req);
});

server.on('uncaughtException', (req, res, route, err) => {
	logger.error(`uncaughtException ${req.method} ${req.url} err:${err}`, req);
	res.send(500, {err: 'internal_error'});
});

server.on('InternalServer', function (req, res, err, cb) {
	logger.error(`InternalServer ${req.method} ${req.url} ${res.statusCode} ${JSON.stringify(err)}`, req);
	err.body = 'something is wrong!';
	return cb();
});

require('./server_endpoints')(server);

module.exports = {
	start: port => {
		return new Promise(
			(ok, ko) => {
				server.listen(port, err => {
					if (err) {
						return ko(err);
					}
					ok(server);
				});
			}
		);
	}
};
