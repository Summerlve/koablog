"use strict";
let router = require("koa-router")();
let views = require("co-views");
// path
let viewsPath = global.path.views;
// render
let render = views(viewsPath, {
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
