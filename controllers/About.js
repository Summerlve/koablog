"use strict";
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

// index
// GET
module.exports.index = function* (next) {
	this.body = yield render("/frontend/abouts/abouts.html", {
		title: "Abouts"
	});
};
