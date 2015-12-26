"use strict";
// test router '/groups'
const request = require("request");
const configs = require("./configs.json");
const assert = require("assert");
const util = require("util");


// configs
const routerPrefix = "/groups";
const authentications = "/authentications";
const protocol = configs.app.protocol;
const host = configs.app.host;
const port = configs.app.port;

describe("Test the /groups", function () {
    let root = {
        id: -1,
        username: "",
        password: "",
		penName: "",
        groupName: "",
        token: ""
    };

    let tempGroup = {
        id: -1,
        name: "",
        description: ""
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

    // create a new group
    it("create group must be ok", function (done) {
        request({
            method: "POST",
            url: util.format("%s://%s:%s%s", protocol, host, port, routerPrefix),
            form: {
                groupName: "()*)_(_)"
            },
            headers: {
                Authorization: "jwt " + root.token
            }
        }, function (error, response, body) {
            assert.strictEqual(error, null);
            assert.strictEqual(response.statusCode, 200);
            tempGroup.id = JSON.parse(body).groupId;
            tempGroup.name = "()*)_(_)";
            assert.strictEqual(typeof tempGroup.id, "number");
            done();
        });
    });

    // 5000
    it("create group when groupName is void must be failed", function (done) {
        request({
            method: "POST",
            url: util.format("%s://%s:%s%s", protocol, host, port, routerPrefix),
            form: {
                groupName: ""
            },
            headers: {
                Authorization: "jwt " + root.token
            }
        }, function (error, response, body) {
            assert.strictEqual(error, null);
            assert.strictEqual(response.statusCode, 400);
            assert.strictEqual(JSON.parse(body).errorCode, 5000);
            done();
        });
    });

    // 5000
    it("update group when groupName is void must be failed", function (done) {
        request({
            method: "PUT",
            url: util.format("%s://%s:%s%s%s", protocol, host, port, routerPrefix, "/" + tempGroup.id),
            form: {
                groupName: ""
            },
            headers: {
                Authorization: "jwt " + root.token
            }
        }, function (error, response, body) {
            assert.strictEqual(error, null);
            assert.strictEqual(response.statusCode, 400);
            assert.strictEqual(JSON.parse(body).errorCode, 5000);
            done()
        });
    });

    // 5001
    it("create group when group name already exists must be failed", function (done) {
        request({
            method: "POST",
            url: util.format("%s://%s:%s%s", protocol, host, port, routerPrefix),
            form: {
                groupName: tempGroup.name
            },
            headers: {
                Authorization: "jwt " + root.token
            }
        }, function (error, response, body) {
            assert.strictEqual(error, null);
            assert.strictEqual(response.statusCode, 400);
            assert.strictEqual(JSON.parse(body).errorCode, 5001);
            done();
        });
    });

    // 5001
    it("update group when group name alreadt exists must be failed", function (done) {
        request({
            method: "PUT",
            url: util.format("%s://%s:%s%s%s", protocol, host, port, routerPrefix, "/" + tempGroup.id),
            form: {
                groupName: tempGroup.name
            },
            headers: {
                Authorization: "jwt " + root.token
            }
        }, function (error, response, body) {
            assert.strictEqual(error, null);
            assert.strictEqual(response.statusCode, 400);
            assert.strictEqual(JSON.parse(body).errorCode, 5001);
            done();
        });
    });

    // update tempGroup's name
    it("update tempGroup's name must be ok", function (done) {
        request({
            method: "PUT",
            url: util.format("%s://%s:%s%s%s", protocol, host, port, routerPrefix, "/" + tempGroup.id),
            form: {
                groupName: "91082<>>?:{P:>}"
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

    // delete tempGroup
    it("delete tempGroup must be ok", function (done) {
        request({
            method: "DELETE",
            url: util.format("%s://%s:%s%s%s", protocol, host, port, routerPrefix, "/" + tempGroup.id),
            headers: {
                Authorization: "jwt " + root.token
            }
        }, function (error, response, body) {
            assert.strictEqual(error, null);
            assert.strictEqual(response.statusCode, 200);
            done();
        });
    });

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
