var router = require("koa-router")();
var views = require("co-views");
var parse = require("co-body");
var User = require("../models/User");
var MD5 = require("md5");
var jwt = require("jsonwebtoken");
var moment = require("moment");

// use redis to store token.
var redisClient = global.redisClient;

// get the cert to decode or encode jwt.
var cert = global.cert;

// get the view's path
var viewsPath = global.path.views;

// render
var render = views(viewsPath, {
	map: {
		html: "ejs"
	}
});

// middlewares
var getToken = require("../middlewares/getToken");

router
	.get("/panel", function* (next) {
		this.body = yield render("/backend/panel", {
			title: "Panel"
		});
	});

router
	.post("/authentication", function* (next) {
		var body = yield parse.form(this);

		var user = yield User
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
			var days = 7;
			var seconds = days * 24 * 60 * 60
			var expires = moment().add(seconds, "seconds").valueOf(); // this is unix timestamp

			// create token
			var token = jwt.sign({
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
			var token = this.token;

			// 在redis中删除这个token。
			redisClient.del(token);
			this.body = {
				status_code: 200,
				description: "log out succeed"
			};
		}
	);

module.exports = router.routes();
