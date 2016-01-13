"use strict";
const router = require("koa-router")();
const views = require("co-views");
const parse = require("co-body");
const User = require("../models/User");
const Group = require("../models/Group");
const MD5 = require("md5");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const configs = require("../configs/configs");

// use redis to store token.
const redisClient = configs.redisClient;

// get the cert to decode or encode jwt.
const cert = configs.jwt.cert;

// get the view's path
const viewsPath = configs.path.views;

// get token
// POST
module.exports.login = function* login (next) {
	let body = yield parse.form(this);

	let user = yield User.find({
		attributes: ["id", "username", "avatar", "pen_name"],
		where: {
			username: body.username,
			password: MD5(body.password)
		}
	});

	if (user === null) {
		this.status = 401;
		this.body = {
			statusCode: 401,
			reasonPhrase: "Unauthorized",
			description: "username or password is not correct",
			errorCode: 1004
		};
		return ;
	}

	// set the http header field
	this.set("Pragma", "no-cache");
	this.set("Cache-Control", "no-store");

	// expires time is 7 days
	let days = 7;
	let seconds = days * 24 * 60 * 60;
	// this is unix timestamp with utc time
	let expires = moment().utcOffset(8).add(seconds, "seconds").valueOf();

	// create token
	let token = jwt.sign({
		iss: user.id,
		exp: expires
	}, cert);

	// store the token into redis , and set the expires time
	redisClient.set(token, "");
	redisClient.expire(token, seconds);

	// return json
	this.body = {
		token: token,
		expires: expires,
		user: user
	};
	return ;
};

//check token
// PUT
module.exports.check = function* check (next) {
    this.body = {

    };
    return ;
};

// log out, remove token
// DELETE
module.exports.logout = function* logout (next) {
    // 从上一个中间件中获取token。
    let token = this.token;

    // 在redis中删除这个token。
    redisClient.del(token);
    this.body = {
        statusCode: 200,
        reasonPhrase: "OK",
        description: "log out succeed"
    };
    return ;
};
