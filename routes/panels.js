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

router.get("/panels", function* (next) {
	this.body = yield render("/backend/panels/panels", {
		title: "Panels"
	});
	return ;
});

module.exports = router.routes();
