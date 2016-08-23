'use strict';

const assert = require('assert');

module.exports = function () {

	this.Then(/^the response body has an "([^"]*)" field$/, (expectedFieldName) => {
		const world = this.world;
		assert.ok(world.lastResponse.body.hasOwnProperty(expectedFieldName));
		return Promise.resolve();
	});

};