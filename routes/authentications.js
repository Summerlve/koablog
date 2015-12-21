"use strict";
const router = require("koa-router")();
const views = require("co-views");
const parse = require("co-body");
const User = require("../models/User");
const Group = require("../models/Group");
const MD5 = require("md5");
const jwt = require("jsonwebtoken");
const moment = require("moment");

// use redis to store token.
const redisClient = global.redisClient;

// get the cert to decode or encode jwt.
const cert = global.cert;

// get the view's path
const viewsPath = global.path.views;

// render
const render = views(viewsPath, {
	map: {
		html: "ejs"
	}
});

// middlewares
const getToken = require("../middlewares/getToken");

router.post("/authentications", function* (next) {
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
});

// 查看token是否过期
router.put("/authentications",
	getToken,
	function* (next) {
		this.body = {

		};
		return ;
	}
);

// 注销功能：删除存储在redis里面的token，如果删除成功则通知前端。
// 当前端和后端都将token删除之后则注销成功。
router.delete("/authentications",
	getToken,
	function* (next) {
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
	}
);

module.exports = router.routes();
