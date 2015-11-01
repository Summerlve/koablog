"use strict";
const router = require("koa-router")();
const views = require("co-views");
// path
const viewsPath = global.path.views;
// render
const render = views(viewsPath, {
	map: {
		html: "ejs"
	}
});

router
	.get("/about", function* (next) {
		this.body = yield render("/frontend/about/about.html", {
			title: "About"
		});
	});

module.exports = router.routes();
