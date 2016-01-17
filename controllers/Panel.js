"use strict";
// import modules
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

module.exports.index = function* index (next) {
	this.body = yield render("/backend/panels/panels", {
		title: "Panels"
	});
	return ;
};
