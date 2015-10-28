"use strict";
let router = require("koa-router")();
let views = require("co-views");
let User = require("../../models/User");
let ArticleView = require("../../models/Article").ArticleView;
let parse = require("co-body");

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

// middlewares
let getToken = require("../../middlewares/getToken");
let getIdentity = require("../../middlewares/getIdentity");
let permissionsFilter = require("../../middlewares/permissionsFilter");

// middlewares
let resourceCheck = require("./middlewares/resourceCheck");

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
	.get(
		"/authors/:pen_name",
		resourceCheck,
		function* (next) {
			// from resourceCheck
			let author = this.resource;
			let pen_name = this.pen_name;

			// get the newest 4 articles of this author
			let articles = yield ArticleView.findAll({
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
		}
	);

router
	.post(
		"/authors",
		getToken,
		getIdentity,
		permissionsFilter({
			and: [
				"addUser"
			]
		}),
		function* (next) {
			let body = yield parse.form(this);

			try {

			}
			catch (error) {

			}
		}
	);

router
	.delete(
		"/authors",
		resourceCheck,
		getToken,
		getIdentity,
		permissionsFilter({
			and: [
				"deleteUser"
			]
		}),
		function* (next) {

		}
	);

router
	.put(
		"/authors",
		getToken,
		getIdentity,
		permissionsFilter({
			and: [
				"updateUser"
			]
		}),
		function* (next) {

		}
	);

module.exports = router.routes();
