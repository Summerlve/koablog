var router = require("koa-router")();
var Tag = require("../models/Tag");
var views = require("co-views");

// path
var viewsPath = global.path.views;

// row
var tagsPerRow = 6; // 每行6个tag

// render
var render = views(viewsPath, {
	map: {
		html: "ejs"
	}
});

router
	.get("/tags", function* (next) {
		var tags = yield Tag.findAll({
			order: ["id"]
		});
		
		this.body = yield render("/frontend/tags/tags", {
			tags: tags,
			title: "Tags",
			tagsPerRow: tagsPerRow
		});
	});

router
	.param("name", function* (name, next) {
		if (typeof name !== "string") return this.status = 404;
		else this.name = name;
		yield next;
	})
	.get("/tag/:name", function* (next) {
		var tag = yield Tag.find({
			attributes: ["id"],
			where: {
				name: this.name
			}
		});
		
		if (tag === null) {
			this.status = 404;
			this.body = "tag not found"
			return ;
		}
		
		var tag_id = tag.id;
		
		var articles = yield Article.findAll({
			where: {
				tag_id: tag_id
			}
		});
		
		if (articles.length === 0) {
			this.body = "this tag dont have any article"
		}
		else {
			this.body = articles;
		}
	});
	
module.exports = router.routes();