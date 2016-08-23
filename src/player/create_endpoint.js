'use strict';

const logger = require('../logger');
const createPlayer = require('./create');
const errors = require('./errors');

module.exports = (req, res, next) => {
	logger.info(`attempt to create a new player with params ${req.params}`, req);

	const newPlayer = {};

	if (req.params.fullname) {
		newPlayer.fullname = req.params.fullname;
	} else {
		logger.warn('player creation requires a full name', req);
		res.send(400, errors.MISSING_FULLNAME_FIELD);
		return next();
	}

	if (req.params.email) {
		newPlayer.email = req.params.email;
	} else {
		logger.warn('player creation requires email', req);
		res.send(400, errors.MISSING_EMAIL_FIELD);
		return next();
	}

	if (req.params.idp) {
		newPlayer.idp = req.params.idp;
	} else {
		logger.warn('player creation requires idp', req);
		res.send(400, errors.MISSING_IDP_FIELD);
		return next();
	}

	if (req.params.avatar) {
		newPlayer.avatar = req.params.avatar;
	}

	createPlayer(newPlayer, req.userId)
		.then(playerId => {
			res.send(201, {id: playerId});
			return next();
		})
		.catch(error => {
			logger.error(`error trying to create a player ${error} ${JSON.stringify(error)}`, req);
			res.send(500, {error});
			return next(error);
		});
};
