var router = require("koa-router")();
var views = require("co-views");
var parse = require("co-body");
var User = require("../models/User");
var MD5 = require("md5");
var jwt = require("jsonwebtoken");
var moment = require("moment");

// create redis socket , and listening to the error event.
var redis = require("redis");
var host = "127.0.0.1";
var redisClient = redis.createClient(6379, host, {});
redisClient.on("error", (error) => {
	console.log("Redis Error", error);
});

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
								attributes: ["id", "username"],
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

			// return token
			this.body = {
				token: token,
				expires: expires
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

module.exports = router.routes();
