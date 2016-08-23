'use strict';

const request = require('request');

module.exports = function (){

	this.When(/^I request to find a player with following search parameters$/, (searchParamsTable) => {
		const world = this.world;

		const queryParams = searchParamsTable.hashes()
			.reduce((map, obj)=> {
				map[obj.field] = obj.value;
				return map;
			}, {});

		const options = {
			url : `${world.host}/api/players`,
			headers: {
				'x-transaction-id': 'tests',
				'x-debug': true
			},
			method : 'GET',
			json : true,
			qs : {q:queryParams}
		};

		return new Promise((ok,ko)=>{
			request(options,(err,res)=>{
				if(err) ko(err);
				else {
					world.lastResponse = {
						statusCode : res.statusCode,
						body : res.body
					};
					console.log('world.lastResponse', world.lastResponse.body.items);
					ok(world.lastResponse);
				}
			});
		});
	});

};
