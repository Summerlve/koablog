"use strict";
const router = require("koa-router")();
const views = require("co-views");
const configs = require("../configs/configs");

// get the view's path
const viewsPath = configs.path.views;

// render
const render = views(viewsPath, {
	map: {
		html: "ejs"
	}
});

router.get("/roots", function* (next) {
	this.body = yield render("/backend/roots/roots", {
		title: "Roots"
	});
	return ;
});

module.exports = router.routes();
