"use strict";
const router = require("koa-router")();
const views = require("co-views");
const configs = require("../configs/configs");
var controller = {};

// path
const viewsPath = configs.path.views;
// render
const render = views(viewsPath, {
	map: {
		html: "ejs"
	}
});

controller.get = function* (next) {
	this.body = yield render("/frontend/abouts/abouts.html", {
		title: "Abouts"
	});
};

module.exports = controller;
