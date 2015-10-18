"use strict";
let router = require("koa-router")();
let parse = require("co-body");
let User = require("../models/User");
let Group = require("../models/Group");

// middlewares
let getToken = require("../middlewares/getToken");
let getIdentity = require("../middlewares/getIdentity");
let getOwnPermissions = require("../middlewares/getOwnPermissions");
let getAllPermissions = require("../middlewares/getAllPermissions");

router
	.param("id", function* (id, next) {
		if (isNaN(parseInt(id, 10))) {
			// id不是数字的情况，就404。
			this.status = 404;
			this.body = "article not found";
			return ;
		}
		else {
			this.id = id;
		}
		yield next;
	})
	.get("/users/:id", function* (next) {
		let id = this.id;
	});

router
	.post(
		"/users",
		getToken,
		getIdentity,
		getOwnPermissions,
		getAllPermissions,
		function* (next) {
			// get allPermissions from middleware
			let allPermissions = this.allPermissions;
			// get permissions from middleware getOwnPermissions.js
			let ownPermissions = this.ownPermissions;
			// get userId from muddleware getIdentity.js
			let userId = this.userId;

			if (!ownPermissions.has(allPermissions.get("addUser"))) {
				this.status = 400;
				this.body = {

				};
			}
			else {
				let body = yield parse.form(this);
			}
		});

module.exports = router.routes();
