'use strict';

const request = require('request');

module.exports = function (){

	this.When(/^I request to create a new player with following data$/, (playerTable) => {
		const world = this.world;

		const options = {
			url : `${world.host}/api/players`,
			method : 'POST',
			json : true,
			body : playerTable.hashes()[0]
		};

		return new Promise((ok,ko)=>{
			request(options,(err,res)=>{
				if(err) ko(err);
				else {
					world.lastResponse = {
						statusCode : res.statusCode,
						body : res.body
					};
					ok();
				}
			});
		});
	});

};
