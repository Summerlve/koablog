var router = require("koa-router")();
var views = require("co-views");
var parse = require("co-body");
var User = require("../models/User");
var MD5 = require("md5");

// path
var viewsPath = global.path.views;

// render
var render = views(viewsPath, {
	map: {
		html: "ejs"
	}
});

router
	.get("/admin", function* (next) {
		if (this.session.authenticated) {
			this.body = yield render("/backend/panel", {
				title: "Panel",
				user: {
					username: this.session.username,
					id: this.session.id
				}
			});
		}
		else {
			this.body = yield render("/backend/login", {
				title: "login"
			});
		}
	});

router
	.post("/admin", function* (next) {
		var body = yield parse(this);
		
		console.log(MD5(body.password));
		
		var user = yield User
							.find({
								attributes: ["id", "username"],
								where: {
									username: body.username,
									password: MD5(body.password)
								}
							});

		if (user !== null) {
			this.session.authenticated = true;
			// put the user.id and user.username into session
			this.session.id = user.id;
			this.session.username = user.username;
		}
		else {
			this.session.authenticated = false;
		}
		this.redirect("/login");
	});

module.exports = router.routes();
