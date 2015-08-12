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
	.get("/login", function* (next) {
		if (this.session.authenticated) {
			this.body = yield render("/backend/panel", {
				title: "Panel",
				user: {
					username: this.session.username
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
	.post("/login", function* (next) {
		var body = yield parse(this);

		console.log(MD5(body.password + "koaBlog"));
		var user = yield User
							.find({
								attributes: ["id", "username"],
								where: {
									username: body.username,
									password: body.password
								}
							});

		if (user !== null) {
			this.session.authenticated = true;
			// put the user.id and user.username into session
			this.session.userid = user.id;
			this.session.username = user.username;

		}
		else {
			this.session.authenticated = false;
		}
		this.redirect("/login");
	});

module.exports = router.routes();
