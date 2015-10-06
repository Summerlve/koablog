"use strict";
let router = require("koa-router")();
let views = require("co-views");
let User = require("../models/User");
let Article = require("../models/Article");

// path
let viewsPath = global.path.views;

// page and row
let limit = 4;
let authorsPerRow = 2; // 一行有numPerRow个作者，因为bootstrap的栅格一行有12列，所以此处必须能把12整除

// render
let render = views(viewsPath, {
	map: {
		html: "ejs"
	}
});

// page of authors
router
	.get("/authors", function* (next) {
		// page默认为1
		let current = parseInt(this.query.page || 1, 10);

		let authors = yield User.findAll({
			order: ["id"],
			offset: (current - 1) * limit,
			limit: limit
		});

		if (authors.length === 0) {
			this.status = 404;
			this.body = "没有更多的作者了";
			return ;
		}

		let count = yield User.count();

		let previous = current - 1;
		let next_ = count - limit * current > 0 ? current + 1 : 0;

		this.body = yield render("/frontend/authors/authors", {
			title: "Authors",
			authors: authors,
			page: {
				urlPrefix: "/authors",
				current: current,
				previous: previous,
				next: next_
			},
			authorsPerRow: authorsPerRow
		});
	});

// one of the author
router
	.get("/authors/:pen_name", function* (next) {
		let pen_name = this.params.pen_name;

		let author = yield User.find({
			where: {
				pen_name: pen_name
			}
		});

		if (author === null) {
			this.status = 404;
			this.body = "author not found";
			return ;
		}

		// get the newest 4 articles of this author
		let articles = yield Article.findAll({
			order: [
				["id", "DESC"]
			],
			where: {
				author: pen_name
			},
			limit: 4
		});

		this.body = yield render("/frontend/authors/details", {
			author: author,
			articles: articles,
			title: author.pen_name
		});
	});

module.exports = router.routes();
