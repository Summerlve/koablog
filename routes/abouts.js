"use strict";
const router = require("koa-router")();
const views = require("co-views");
const configs = require("../configs/configs");

// path
const viewsPath = configs.path.views;
// render
const render = views(viewsPath, {
	map: {
		html: "ejs"
	}
});

router.get("/abouts", function* (next) {
	this.body = yield render("/frontend/abouts/abouts.html", {
		title: "Abouts"
	});
});

module.exports = router.routes();
