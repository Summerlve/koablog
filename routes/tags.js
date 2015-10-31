"use strict";
const router = require("koa-router")();
const Tag = require("../models/Tag");
const views = require("co-views");

// path
const viewsPath = global.path.views;

// row
const tagsPerRow = 6; // 每行6个tag

// render
const render = views(viewsPath, {
	map: {
		html: "ejs"
	}
});

router
	.get("/tags", function* (next) {
		let tags = yield Tag.findAll({
			order: ["id"]
		});

		this.body = yield render("/frontend/tags/tags", {
			tags: tags,
			title: "Tags",
			tagsPerRow: tagsPerRow
		});
		return ;
	});

router
	.param("name", function* (name, next) {
		if (typeof name !== "string") return this.status = 404;
		else this.name = name;
		yield next;
	})
	.get("/tag/:name", function* (next) {
		let tag = yield Tag.find({
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

		let tag_id = tag.id;

		let articles = yield Article.findAll({
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
