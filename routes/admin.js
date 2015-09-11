"use strict";
let router = require("koa-router")();
let views = require("co-views");
let parse = require("co-body");
let User = require("../models/User");
let MD5 = require("md5");
let jwt = require("jsonwebtoken");
let moment = require("moment");

// use redis to store token.
let redisClient = global.redisClient;

// get the cert to decode or encode jwt.
let cert = global.cert;

// get the view's path
let viewsPath = global.path.views;

// render
let render = views(viewsPath, {
	map: {
		html: "ejs"
	}
});

// middlewares
let getToken = require("../middlewares/getToken");

router
	.get("/panel", function* (next) {
		this.body = yield render("/backend/panel", {
			title: "Panel"
		});
	});

router
	.post("/authentication", function* (next) {
		let body = yield parse.form(this);

		let user = yield User
							.find({
								attributes: ["id", "username", "avatar", "pen_name"],
								where: {
									username: body.username,
									password: MD5(body.password)
								}
							});

		if (user !== null) {
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
		}
		else {
			this.status = 401;
			this.body = {
				status_code: 401,
				error_description: "username or password is not correct"
			}
		}
	});

// 注销功能：删除存储在redis里面的token，如果删除成功则通知前端。
// 当前端和后端都将token删除之后则注销成功。
router
	.delete(
		"/authentication",
		getToken,
		function* (next) {
			// 从上一个中间件中获取token。
			let token = this.token;

			// 在redis中删除这个token。
			redisClient.del(token);
			this.body = {
				status_code: 200,
				description: "log out succeed"
			};
		}
	);

module.exports = router.routes();
