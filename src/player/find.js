'use strict';

const dbConn = require('../database/connection');

module.exports = query => {
	return dbConn()
		.then(db => db.collection('players').find(query, {_id: 0}).limit(10))
		.then(cursor => {
			return Promise.resolve(cursor.toArray());
		})
		.catch(err => {
			return Promise.reject(err);
		});
};
