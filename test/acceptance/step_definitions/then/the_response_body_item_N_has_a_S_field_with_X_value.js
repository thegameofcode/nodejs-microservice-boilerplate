"use strict";

const assert = require('assert');

module.exports = function () {
	this.Then(/^the response body item (\d+) has an? "([^"]*)" field with "([^"]*)" value?$/, (itemIndex, fieldName, fieldValue, done) => {
		const world = this.world;

		assert.ok(world.lastResponse.body.hasOwnProperty("items"));
		assert.ok(world.lastResponse.body.items[Number(itemIndex)].hasOwnProperty(fieldName));
		assert.ok(world.lastResponse.body.items[Number(itemIndex)][fieldName] === fieldValue);

		done();
	});
};
