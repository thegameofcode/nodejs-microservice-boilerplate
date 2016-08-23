'use strict';

const dbConn = require('../../../../src/database/connection');

module.exports = function (){

	this.After(()=>{
		return dbConn()
			.then(db=>{
				return db.collection('players').removeMany()
			})
	});

};
