"use strict";
const router = require("koa-router")();
const views = require("co-views");
const User = require("../models/User");
const ArticleView = require("../models/Article").ArticleView;
const parse = require("co-body");

// path
const viewsPath = global.path.views;

// page and row
const limit = 4;
const authorsPerRow = 2; // 一行有numPerRow个作者，因为bootstrap的栅格一行有12列，所以此处必须能把12整除

// render
const render = views(viewsPath, {
	map: {
		html: "ejs"
	}
});

// middlewares
const getToken = require("../middlewares/getToken");
const getIdentity = require("../middlewares/getIdentity");
const permissionsFilter = require("../middlewares/permissionsFilter");

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
		"/authors/:id",
		function* (next) {
			let id = this.params.id;

		    let author = yield User.find({
				attributes: ["id", "pen_name", "introduce", "avatar"],
		        where: {
		            id: id
		        }
		    });

			if (author === null) {
				this.status = 404;
				return ;
			}

			let penName = author.pen_name;

			switch (this.accepts("json", "html")) {
				case "json": {

				}break;
				case "html": {
					// get the newest 4 articles of this author
					let articles = yield ArticleView.findAll({
						order: [
							["id", "DESC"]
						],
						where: {
							author: penName
						},
						limit: 4
					});

					this.body = yield render("/frontend/authors/details", {
						author: author,
						articles: articles,
						title: author.pen_name
					});
					return ;
				}break;
				default: {
					// 只允许json和html。
					this.throw(406, "json and html only");
					return ;
				}
			}
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
		"/authors/:id",
		getToken,
		getIdentity,
		permissionsFilter({
			and: [
				"deleteUser"
			]
		}),
		function* (next) {
			console.log(this.params.id);
		}
	);

router
	.put(
		"/authors/:id",
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
