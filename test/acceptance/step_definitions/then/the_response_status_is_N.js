'use strict';

const assert = require('assert');

module.exports = function (){

	this.Then(/^the response status code is (\d+)$/, (expectedStatus) => {
		const world = this.world;
		assert.equal(world.lastResponse.statusCode, Number(expectedStatus));
		return Promise.resolve();
	});

};
