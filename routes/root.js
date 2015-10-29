"use strict";
let router = require("koa-router")();
let views = require("co-views");

// get the view's path
let viewsPath = global.path.views;

// render
let render = views(viewsPath, {
	map: {
		html: "ejs"
	}
});

router
	.get("/root", function* (next) {
		this.body = yield render("/backend/root", {
			title: "Root"
		});
	});

module.exports = router.routes();
