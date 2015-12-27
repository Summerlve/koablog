"use strict";
// test router '/articles'
const request = require("request");
const configs = require("./configs.json");
const assert = require("assert");
const util = require("util");
const jwt = require("jsonwebtoken");
const moment = require("moment");

// configs
const routerPrefix = "/articles";
const authentications = "/authentications";
const protocol = configs.app.protocol;
const host = configs.app.host;
const port = configs.app.port;
const cert = configs.jwt.cert;

describe("Test the /articles", function (done) {
    let root = {
        id: -1,
        username: "",
        password: "",
		penName: "",
        groupName: "",
        token: ""
    };

    // group of author
    let temp = {
        id: -1,
        username: "!@#$%^&*()",
        password: "!@#$%^&*()",
        penName: "!@#$%^&*()",
        groupName: "author",
        token: ""
    };

    it("get root user must be ok", function (done) {
        assert.deepStrictEqual(configs.users.root.length >= 1, true, "root users's length must >= 1");
        root.username = configs.users.root[0].username;
        root.password = configs.users.root[0].password;
        root.id = configs.users.root[0].id;
		root.groupName = "root";
		root.penName = configs.users.root[0].penName;
        done();
    });

    it("root account log in (get token) with right username and password must be ok", function (done) {
        request({
            method: "POST",
            url: util.format("%s://%s:%s%s", protocol, host, port, authentications),
            form: {
                username: root.username,
                password: root.password
            }
        }, function (error, response, body) {
            assert.strictEqual(error, null);
            assert.strictEqual(response.statusCode, 200);
            root.token = JSON.parse(body).token;
            assert.strictEqual(typeof root.token, "string");
            done();
        });
    });

    it("get one article of root accounts", function (done) {
        request({
            method: "GET",
            url: util.format("%s://%s:%s%s%s", protocol, host, port, routerPrefix, "?sort=+createAt&limit=1&offset=0"),
        }, function (error, response, body) {
                assert.strictEqual(error, null);
                assert.strictEqual(response.statusCode, 200);
                done();
        });
    });
});
