"use strict";
// test router /
const request = require("request");
const configs = require("./configs.json");
const assert = require("assert");
const util = require("util");

// configs
const routerPrefix = "/";
const protocol = configs.app.protocol;
const host = configs.app.host;
const port = configs.app.port;

describe("Test the /", function () {
    it("connect to / must be ok", function (done) {
        request({
            method: "GET",
            url: util.format("%s://%s:%s%s", protocol, host, port, routerPrefix),

        }, function (error, response, body) {
            console.log(body);
            assert.strictEqual(error, null);
            assert.strictEqual(response.statusCode, 301);
            done();
        });
    });
});
