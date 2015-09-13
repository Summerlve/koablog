"use strict";
let router = require("koa-router")();
let Article = require("../models/Article");
let views = require("co-views");
let parse = require("co-body");
// path
let viewsPath = global.path.views;
// page
let limit = 5;
// render
let render = views(viewsPath, {
	map: {
		html: "ejs"
	}
});

// middlewares
let getToken = require("../middlewares/getToken");

// redirect '/' to the '/articles'
router
	.redirect("/", "/articles");

// page of the articles
router
	.get("/articles", function* (next) {
		switch (this.accepts("json", "html")) {
			case "json": {
				// 当请求json时
				// 取得查询字符串中的key、value
				let sort = this.query.sort;
				let limit = this.query.limit;
				let offset = this.query.offset;

				let sign = sort.slice(0, 1); // get the sort's sign
				let orderByWhat = sort.slice(1); // order by what

				let sortingWay = sign === "+" ? "ASC" : "DESC";

				let articles = yield Article.findAll({
					order: [
						[orderByWhat, sortingWay]
					],
					offset: offset,
					limit: limit
				});

				if (articles.length === 0) {
					this.status = 404;
					this.body = "没有更多的内容了";
					return ;
				}

				this.body = articles;

			}break;
			case "html": {
				// 当请求html时
				// page默认为1
				let current = parseInt(this.query.page || 1, 10);

				let articles = yield Article.findAll({
					order: ["id"],
					offset: (current - 1) * limit,
					limit: limit
				});

				if (articles.length === 0) {
					this.status = 404;
					this.body = "没有更多的内容了";
					return ;
				}

				let count = yield Article.count();

				let previous = current - 1;
				let next_ = count - limit * current > 0 ? current + 1 : 0;

				this.body = yield render("/frontend/articles/articles", {
					title: "Articles",
					articles: articles,
					page: {
						urlPrefix: "/articles",
						current: current,
						previous: previous,
						next: next_
					}
				});
			}break;
			default: {
				// 只允许json和html。
				this.throw(406, "json and html only");
			}
		}
	});

// one of the articles
router
	.param("id", function* (id, next) {
		if (isNaN(parseInt(id, 10))) {
			// id不是数字的情况，就404。
			this.status = 404;
			this.body = "article not found";
			return ;
		}
		else {
			this.id = id;
		}
		yield next;
	})
	.get("/articles/:id", function* (next) {
		let id = parseInt(this.id, 10);

		let article = yield Article.find({
			where: {
				id: id
			}
		});

		if (article === null) {
			this.status = 404;
			this.body = "article not found";
			return ;
		}

		// 检测previous、next页面
		let previous = yield Article.find({
			order: [
				["id", "DESC"]
			],
			where: {
				id: {
					$lt: id
				}
			},
			limit: 1
		});

		let next_ = yield Article.find({
			order: ["id"],
			where: {
				id: {
					$gt: id
				}
			},
			limit: 1
		});

		this.body = yield render("/frontend/articles/details", {
			article: article,
			title: article.title,
			page: {
				previous: previous === null ? 0 : previous.id,
				next: next_ === null ? 0 : next_.id
			}
		});
	});

// add new article
router
	.post(
		"/articles",
		getToken,
		function* (next) {

		}
	);

router
	.delete(
		"/articles",
		getToken,
		function* (next) {
			
		}
	);

module.exports = router.routes();
