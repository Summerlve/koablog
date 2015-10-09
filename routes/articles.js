"use strict";
let router = require("koa-router")();
let ArticleView = require("../models/Article").ArticleView;
let Tag = require("../models/Tag");
let views = require("co-views");
let parse = require("co-body");
let Permission = require("../models/Permission").Permission;

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
let getIdentity = require("../middlewares/getIdentity");
let getOwnPermissions = require("../middlewares/getOwnPermissions");
let getAllPermissions = require("../middlewares/getAllPermissions");

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
				//  指定作者，这是可选的
				let author = this.query.author;

				let sign = sort.slice(0, 1); // get the sort's sign
				let orderByWhat = sort.slice(1); // order by what

				let sortingWay = sign === "+" ? "ASC" : "DESC"; // 确定升序还是降序

				let articles = yield ArticleView.findAll({
					where: author ? {author: author} : void 0,
					order: [
						[orderByWhat, sortingWay]
					],
					offset: offset,
					limit: limit
				});

				// 即便是查询到的articles长度为0也需要返回

				this.body = articles;
			}break;
			case "html": {
				// 当请求html时
				// page默认为1
				let current = parseInt(this.query.page || 1, 10);

				let articles = yield ArticleView.findAll({
					order: ["id"],
					offset: (current - 1) * limit,
					limit: limit
				});

				if (articles.length === 0) {
					this.status = 404;
					this.body = "没有更多的内容了";
					return ;
				}

				let count = yield ArticleView.count();

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

		let article = yield ArticleView.find({
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
		let previous = yield ArticleView.find({
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

		let next_ = yield ArticleView.find({
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
		getIdentity,
		getOwnPermissions,
		getAllPermissions,
		function* (next) {
			// get allPermissions from middleware
			let allPermissions = this.allPermissions;
			// get permissions from middleware getOwnPermissions.js
			let ownPermissions = this.ownPermissions;
			// get userId from muddleware getIdentity.js
			let userId = this.userId;

			// judge the permission
			if (ownPermissions.has(allPermissions.get("addArticle"))) {
				let body = yield parse.form(this);
				let title = body.title;
				let content = body.content;
				let tag = body.tag;

				console.log(title, tag, content);

				// create new artilce
				let article = ArticleView.build({

				});

				// add new article


				this.body = {
					statusCode: "200",
					reasonPhrase: "OK",
					description: "add article succeed"
				};
			}
			else {
				// need permission
				this.status = 403;
				this.body = {
					statusCode: 403,
					reasonPhrase: "Forbidden",
					description: "need permission add article"
				}
			}
		}
	);

router
	.delete(
		"/articles",
		getToken,
		getIdentity,
		getOwnPermissions,
		getAllPermissions,
		function* (next) {
			// 权限说明：root账户有所有的权限，因此能够删除任意的文章，而作者只能删除自己的文章
			// get allPermissions from middleware
			let allPermissions = this.allPermissions;
			// get ownPermissions from middleware getOwnPermissions.js
			let ownPermissions = this.ownPermissions;
			// get userId and from muddleware getIdentity.js
			let userId = this.userId;

			if (ownPermissions.has(allPermissions.get("deleteArticle"))) {

			}
		}
	);

router
	.put(
		"/articles",
		getToken,
		getIdentity,
		getOwnPermissions,
		getAllPermissions,
		function* (next) {

		}
	);

module.exports = router.routes();
