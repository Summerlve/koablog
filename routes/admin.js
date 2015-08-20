var router = require("koa-router")();
var views = require("co-views");
var parse = require("co-body");
var User = require("../models/User");
var MD5 = require("md5");
var jwt = require("jsonwebtoken");
var cert = global.cert;

// path
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
		var body = yield parse(this);
		
		var user = yield User
							.find({
								attributes: ["id", "username"],
								where: {
									username: body.username,
									password: MD5(body.password)
								}
							});
		
		if (user !== null) {
			//token
			var token = jwt.sign({
				id: user.id
			}, cert);
			
			this.body = {
				access_token: token,
				token_type: "jwt",
				expires_in: 3600,
				refresh_token:""
			}	
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
