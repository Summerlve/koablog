"use strict";
let router = require("koa-router")();
let parse = require("co-body");
let User = require("../models/User");

// middlewares
let getToken = require("../middlewares/getToken");
let getIdentity = require("../middlewares/getIdentity");
let getOwnPermissions = require("../middlewares/getOwnPermissions");
let getAllPermissions = require("../middlewares/getAllPermissions");

router
	.get("/users", function* (next) {

	});

router
	.post(
		"/users",
		getToken,
		getIdentity,
		getOwnPermissions,
		getAllPermissions,
		function* (next) {

		});

module.exports = router.routes();
