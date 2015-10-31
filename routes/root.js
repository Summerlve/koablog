"use strict";
const router = require("koa-router")();
const views = require("co-views");

// get the view's path
const viewsPath = global.path.views;

// render
const render = views(viewsPath, {
	map: {
		html: "ejs"
	}
});

router
	.get("/root", function* (next) {
		this.body = yield render("/backend/root", {
			title: "Root"
		});
		return ;
	});

module.exports = router.routes();
