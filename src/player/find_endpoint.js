'use strict';

const logger = require('../logger');
const findPlayer = require('./find');

module.exports = (req, res, next) => {
	logger.info(`request to find players with following query ${JSON.stringify(req.query)}`, req);

	//query (q)
	const q = req.query.q;
	let query = {};

	if (q.idp) query[`idp.${q.idp}.id`] = q.id;
	if (q.email) query.email = q.email;
	if (q.search) {
		query.$or = [
			{fullname: new RegExp(q.search)},
			{email: new RegExp(q.search)}
		];
	}

	if (Object.keys(query).length === 0) {
		res.send(400, {error: 'no query parameters found'});
		return next();
	}

	//projection (p)
	const publicFields = ['id', 'creationDate', 'fullname', 'email', 'avatar'];
	const requestedFields = req.query.p ?
		req.query.p.split(',').reduce((map, requestedField) => {
			if (publicFields.indexOf(requestedField) > -1) map.push(requestedField);
			return map;
		}, []) :
		publicFields;

	findPlayer(query)
		.then(players => {
			const items = players.map(player => {
				return requestedFields.reduce((cleanPlayer, requestedField) => {
					if (player.hasOwnProperty(requestedField)) cleanPlayer[requestedField] = player[requestedField];
					return cleanPlayer;
				}, {});
			});
			res.send(200, {items});
			return next();
		})
		.catch(err => {
			logger.error(`error trying to fetch players ${err} ${JSON.stringify(err)}`, req);
			res.send(500, {err: 'internal_error', des: 'error trying to fetch players'});
			return next();
		});
};
