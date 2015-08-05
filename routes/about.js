var router = require("koa-router")();
var views = require("co-views");
// path
var viewsPath = global.path.views;
// render
var render = views(viewsPath, {
	map: {
		html: "ejs"
	}
});

router
	.get("/about", function* (next) {
		this.body = yield render("/frontend/about.html", {
			title: "About"
		});
	});

module.exports = router.routes();