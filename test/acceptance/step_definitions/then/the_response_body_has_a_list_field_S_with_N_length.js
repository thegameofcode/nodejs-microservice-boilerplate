'use strict';

const assert = require('assert');

module.exports = function () {
    this.Then(/^the response body has a list field "([^"]*)" with (\d+) length$/, (expectedFieldName, expectedLength, done) => {
        const world = this.world;
        assert.ok(world.lastResponse.body.hasOwnProperty(expectedFieldName));
        assert.ok(world.lastResponse.body[expectedFieldName].length===Number(expectedLength));
        done();
    });
};
