"use strict";
// test router '/tags'
const request = require("request");
const configs = require("./configs.json");
const assert = require("assert");
const util = require("util");
const jwt = require("jsonwebtoken");
const moment = require("moment");

// configs
const routerPrefix = "/tags";
const authentications = "/authentications";
const protocol = configs.app.protocol;
const host = configs.app.host;
const port = configs.app.port;
const cert = configs.jwt.cert;

describe("Test the /tags", function () {
    // group of root
    let root = {
        id: -1,
        username: "",
        password: "",
		penName: "",
        groupName: "",
        token: ""
    };

    let tempTag = {
        id: -1,
        name: ""
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

    // delete failed
    it("delete a tag that do not exists (id is very large) must be failed", function (done) {
        request({
            method: "DELETE",
            url: util.format("%s://%s:%s%s%s", protocol, host, port, routerPrefix, "/1000000000"),
            headers: {
                Authorization: "jwt " + root.token
            }
        }, function (error, response, body) {
            assert.strictEqual(error, null);
            assert.strictEqual(response.statusCode, 404);
            done();
        });
    });

    // 4001 create tag failed
    it("create a new tag with name void must be failed", function (done) {
        request({
            method: "POST",
            url: util.format("%s://%s:%s%s", protocol, host, port, routerPrefix),
            form: {
                name: ""
            },
            headers: {
                Authorization: "jwt " + root.token
            }
        }, function (error, response, body) {
            assert.strictEqual(error, null);
            assert.strictEqual(response.statusCode, 400);
            assert.strictEqual(JSON.parse(body).errorCode, 4001);
            done();
        });
    });

    // create tag succeed
    it("create a new tag with needs info must be ok", function (done) {
        request({
            method: "POST",
            url: util.format("%s://%s:%s%s", protocol, host, port, routerPrefix),
            form: {
                tagName: "*()*&&*())??>"
            },
            headers: {
                Authorization: "jwt " + root.token
            }
        }, function (error, response, body) {
            assert.strictEqual(error, null);
            assert.strictEqual(response.statusCode, 200);
            tempTag.id = JSON.parse(body).tagId;
            assert.strictEqual(typeof tempTag.id, "number");
            done();
        });
    });

    // 4004 change temp tag's name, but name already exists
    it("update temp tag's name but name already exists must be failed", function (done) {
        request({
            method: "PUT",
            url: util.format("%s://%s:%s%s%s", protocol, host, port, routerPrefix, "/" + tempTag.id),
            form: {
                tagName: "*()*&&*())??>"
            },
            headers: {
                Authorization: "jwt " + root.token
            }
        }, function (error, response, body) {
            assert.strictEqual(error, null);
            assert.strictEqual(response.statusCode, 400);
            assert.strictEqual(JSON.parse(body).errorCode, 4004);
            done();
        });
    });

    // change temp tag's name
    it("update temp tag's name must be ok", function (done) {
        request({
            method: "PUT",
            url: util.format("%s://%s:%s%s%s", protocol, host, port, routerPrefix, "/" + tempTag.id),
            form: {
                tagName: "*()*&&*())??>......"
            },
            headers: {
                Authorization: "jwt " + root.token
            }
        }, function (error, response, body) {
            assert.strictEqual(error, null);
            assert.strictEqual(response.statusCode, 200);
            done();
        });
    });

    // delete temp tag
    it("delete temp tag must be ok", function (done) {
        request({
            method: "DELETE",
            url: util.format("%s://%s:%s%s%s", protocol, host, port, routerPrefix, "/" + tempTag.id),
            headers: {
                Authorization: "jwt " + root.token
            }
        }, function (error, response, body) {
            assert.strictEqual(error, null);
            assert.strictEqual(response.statusCode, 200);
            assert.strictEqual(JSON.parse(body).tagId, tempTag.id);
            done();
        });
    });

    // log out root account
    it("log out root account(delete token) with right token must be ok", function (done) {
        request({
            method: "DELETE",
            url: util.format("%s://%s:%s%s", protocol, host, port, authentications),
            headers: {
                Authorization: "jwt " + root.token
            }
        }, function (error, response, body) {
            assert.strictEqual(error, null);
            assert.strictEqual(response.statusCode, 200);
            done();
        });
    });
});
