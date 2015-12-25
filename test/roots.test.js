"use strict";
// test router /roots
const request = require("request");
const configs = require("./configs.json");
const assert = require("assert");
const util = require("util");

// configs
const routerPrefix = "/roots";
const protocol = configs.app.protocol;
const host = configs.app.host;
const port = configs.app.port;

describe("Test the /roots", function () {
    it("connect to /roots must be ok", function (done) {
        request({
            method: "GET",
            url: util.format("%s://%s:%s%s", protocol, host, port, routerPrefix),
            headers: {
                "Accept": "text/html"
            }
        }, function (error, response, body) {
            assert.strictEqual(error, null);
            assert.strictEqual(response.statusCode, 200);
            done();
        });
    });
});
