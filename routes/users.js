"use strict";
let router = require("koa-router")();
let parse = require("co-body");
let User = require("../models/User");
let getIdentity = require("../middlewares/getIdentity");

router
	.get("/users", function* (next) {
		if (!this.session.authenticated) {
			this.redirect("/login");
		}
		else {
			let users = yield User.findAll({
				attributes: ["id", "username", "pen_name"]
			});

			this.body = users;
		}
	});

router
	.post(
		"/users",
		getIdentity,
		function* (next) {
			let groupId = this.groupId;
			let permission
		});

module.exports = router.routes();
