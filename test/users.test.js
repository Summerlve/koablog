"use strict";
// test router '/authors'
const request = require("request");
const configs = require("./configs.json");
const assert = require("assert");
const util = require("util");
const prefix = "/authors";
const auth = "/authentications";
const protocol = configs.app.protocol;
const host = configs.app.host;
const port = configs.app.port;

describe("Test the /authors", function () {
    // temp variables for test
    let token;
    let userId;
    let root = {
        id: -1,
        username: "",
        password: ""
    };

    it("get root user must be ok", function (done) {
        assert.deepStrictEqual(configs.users.root.length >= 1, true, "root users's length must >= 1");
        root.username = configs.users.root[0].username;
        root.password = configs.users.root[0].password;
        root.id = configs.users.root[0].id;
        done();
    });

    it("log in (get token) must be ok", function (done) {
        request({
            method: "POST",
            url: util.format("%s://%s:%s%s", protocol, host, port, auth),
            form: {
                username: root.username,
                password: root.password
            }
        }, function (error, response, body) {
            assert.strictEqual(error, null);
            assert.strictEqual(response.statusCode, 200);
            token = JSON.parse(body).token;
            console.log(token);
            assert.strictEqual(typeof token, "string");
            done();
        });
    });

    it("create a user with right token must be ok", function (done) {
        request({
            method: "POST",
            url: util.format("%s://%s:%s%s", protocol, host, port, prefix),
            form: {
                username: "!@#$%^&*()",
                password: "123456",
                penName: "!@#$%^&*()",
                groupName: "author"
            },
            headers: {
                "Authorization": "jwt " + token
            }
        }, function (error, response, body) {
            userId = JSON.parse(body).userId;
            console.log(body);
            console.log(response.statusCode);
            assert.strictEqual(typeof userId, "number");
            assert.strictEqual(error, null);
            assert.strictEqual(response.statusCode, 200);
        })
    });

    it("create a user with wrong token must be failed", function (done) {
        request({
            method: "POST",
            url: util.format("%s://%s:%s%s", protocol, host, port, prefix),
            headers: {
                "Authorization": "jwt " + "wrongtoken"
            }
        }, function (error, response, body) {
            assert.strictEqual(error, null);
            assert.strictEqual(response.statusCode, 401);
            assert.strictEqual(JSON.parse(body).errorCode, 1001);
            done();
        })
    });

    it("delete a user with right token must be ok", function (done) {
        request({
            method: "DELETE",
            url: util.format("%s://%s:%s%s%s", protocol, host, port, prefix, "/" + userId),
            headers: {
                "Authorization": "jwt " + token
            }
        }, function (error, response, body) {
            console.log(body);
            assert.strictEqual(error, null);
            assert.strictEqual(response.statusCode, 200);
        })
    });

    it("log out (delete token) with right token must be ok", function (done) {
        request({
            method: "DELETE",
            url: util.format("%s://%s:%s%s", protocol, host, port, auth),
            headers: {
                "Authorization": "jwt " + token
            }
        }, function (error, response, body) {
            assert.strictEqual(error, null);
            assert.strictEqual(response.statusCode, 200);
            done();
        });
    });

    it("log out (delete token) with none token must be failed", function (done) {
        request({
            method: "DELETE",
            url: util.format("%s://%s:%s%s", protocol, host, port, auth),
        }, function (error, response, body) {
            assert.strictEqual(error, null);
            assert.strictEqual(response.statusCode, 401);
            assert.strictEqual(JSON.parse(body).errorCode, 1000);
            done();
        });
    });

    it("get one of authors", function (done) {
        let id = root.id;
        request({
            method: "GET",
            url: util.format("%s://%s:%s%s/%s", protocol, host, port, prefix, id)
        }, function (error, response, body) {
            assert.strictEqual(error, null);
            assert.strictEqual(response.statusCode, 200);
            done();
        });
    });

    it("get page of authors", function (done) {
        let page = 1;
        request({
            method: "GET",
            url: util.format("%s://%s:%s%s?page=%s", protocol, host, port, prefix, page)
        }, function(error, response, body) {
            assert.strictEqual(error, null);
            assert.strictEqual(response.statusCode, 200);
            done();
        });
    });
});
