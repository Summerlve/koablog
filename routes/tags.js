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

router.get("/tags", function* (next) {
	switch (this.accepts(["html", "json"])) {
		case "html": {
			let tags = yield Tag.findAll({
				order: ["id"]
			});

			this.body = yield render("/frontend/tags/tags", {
				tags: tags,
				title: "Tags",
				tagsPerRow: tagsPerRow
			});
			return ;
		}break;
		case "json": {
			let tags = yield Tag.findAll({
				order: ["id"]
			});

			this.body = tags;
			return ;
		}break;
		default: {
			this.throw(406, "json and html only");
			return ;
		}
	}
});

router.get("/tags/:id", function* (next) {
	switch (this.accepts(["html", "json"])) {
		case "html": {
			let id = parseInt(this.params.id, 10);

			if (isNaN(id)) {
				this.status = 404;
				return ;
			}

			let tag = yield Tag.find({
				attributes: ["id", "name"],
				where: {
					id: id
				}
			});

			if (tag === null) {
				this.status = 404;
				this.body = "tag not found"
				return;
			}

			this.body = tag;
			return ;
		}break;
		case "json": {
			let id = parseInt(this.params.id, 10);

			if (isNaN(id)) {
				this.status = 404;
				return ;
			}

			let tag = yield Tag.find({
				attributes: ["id", "name"],
				where: {
					id: id
				}
			});

			if (tag === null) {
				this.status = 404;
				this.body = "tag not found"
				return;
			}

			this.body = tag;
			return ;
		}break;
		default: {
			this.throw(406, "json and html only");
			return ;
		}
	}
});

module.exports = router.routes();
