'use strict';

const shortid = require('shortid');
const dbConn = require('../database/connection');

module.exports = (player,creatorId) => {
	const playerToCreate = player;
	playerToCreate.id = `ply.${shortid.generate()}`;
	playerToCreate.creationDate = new Date();
	playerToCreate.creatorId = creatorId;
	return new Promise((resolve, reject) => {
		dbConn()
			.then(db => db.collection('players').insertOne(playerToCreate))
			.then(() => resolve(playerToCreate.id))
			.catch(err => reject(err));
	});

};


