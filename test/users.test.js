"use strict";
// test router '/users'
const request = require("request");
const configs = require("./configs.json");
const assert = require("assert");
const util = require("util");
const prefix = "/user";
const protocol = configs.app.protocol;
const host = configs.app.host;
const port = configs.app.port;

describe("get users info from configs.json", function () {
    it("get root user", function (done) {
        assert.deepStrictEqual(configs.users.root.length >= 1, true, "root users's length must >= 1");
        done();
    });

    it("get token must be ok", function (done) {
        let username = configs.users.root[0].username;
        let password = configs.users.root[0].password;
        console.log(username, password);
        request({
            method: "POST",
            url: util.format("%s://%s:%s%s", protocol, host, port, "/authentications"),
            form: {
                username: username,
                password: password
            }, function (error, response, body) {
                assert.strictEqual(error, null);
                assert.strictEqual(response.statusCode, 200);
                let token = response.token;
                console.log(token);
                done();
            }
        });
    });
});
