"use strict";
const router = require("koa-router")();
const ArticleView = require("../models/Article").ArticleView;
const Article = require("../models/Article").Article;
const Tag = require("../models/Tag");
const views = require("co-views");
const parse = require("co-body");

// path
const viewsPath = global.path.views;
// page
const limit = 5;
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

// db
const sequelize = global.sequelize;

// redirect '/' to the '/articles'
router
	.redirect("/", "/articles");

// page of the articles
router
	.get("/articles", function* (next) {
		switch (this.accepts("json", "html")) {
			case "html": {
				// 当请求html时
				// page默认为1
				let current = parseInt(this.query.page || 1, 10);

				let articles = yield ArticleView.findAll({
					attributes: ["id", "author", "title", "tag", "createAt"],
					order: [
						["createAt", "DESC"]
					],
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
				return ;
			}break;
			case "json": {
				// 当请求json时
				// 取得查询字符串中的key、value
				let sort = this.query.sort;
				let limit = this.query.limit;
				let offset = this.query.offset;
				//  指定作者，这是可选的
				let author = this.query.author;

				// check the params
				if (!sort || !limit || !offset) {
					this.status = 400;
					this.body = {
						statusCode: 400,
						reasonPhrase: "Bad Request",
						description: "params wrong"
					};
					return ;
				}

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
				return ;
			}break;
			default: {
				// 只允许json和html。
				this.throw(406, "json and html only");
				return ;
			}
		}
	});

// one of the articles
router
	.get(
		"/articles/:id",
		function* (next) {
			let id = parseInt(this.params.id, 10);

			if (isNaN(id)) {
				this.status = 404;
				return ;
			}

			let article = yield ArticleView.find({
				where: {
					id: id
				}
			});

			if (article === null) {
				this.status = 404;
				return;
			}

			switch (this.accepts("json", "html")) {
				case "html": {
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
					return ;
				}break;
				case "json": {
					this.body = article;
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

// add new article
router
	.post(
		"/articles",
		getToken,
		getIdentity,
		permissionsFilter({
			and: [
				"create_articles",
				"create_tags"
			]
		}),
		function* (next) {
			// get userId from getIdentity.js
			let userId = this.userId;
			let body = yield parse.form(this);

			// create tag if no exist
			let tag = yield Tag.findOrCreate({
				where: {
					name: body.tag
				}
			});

			tag = tag[0];

			let tagId = tag.id;

			// start transaction
			let transaction = yield sequelize.transaction();
			// create artilce
			try {
				yield Article
						.build({
							title: body.title,
							tag_id: tagId,
							content: body.content,
							user_id: userId
						})
						.save({
							transaction: transaction
						});

				transaction.commit(); // commit the transaction

				this.body = {
					statusCode: 200,
					reasonPhrase: "OK",
					description: "add article succeed"
				};
				return ;
			}
			catch (error) {
				transaction.rollback();

				this.status = 500;
				this.body = {
					statusCode: 500,
					reasonPhrase: "Internal Server Error",
					description: "add article fialed",
					errorCode: 1004
				};
				return ;
			}
		}
	);

// change an article
router
	.put(
		"/articles/:id",
		getToken,
		getIdentity,
		permissionsFilter({
			and: [
				"create_tags",
				{
					or: [
						"update_articles",
						"update_private_articles"
					]
				}
			]
		}),
		function* (next) {
			let id = parseInt(this.params.id, 10);

			if (isNaN(id)) {
				this.status = 404;
				return ;
			}

			let article = yield Article.find({
				where: {
					id: id
				}
			});

			if (article === null) {
				this.status = 404;
				return;
			}

			// get the article
			let body = yield parse.form(this);
			// start transaction
			let transaction = yield sequelize.transaction();
			// update an article
			try {
				let tag = yield Tag.findOrCreate({
					where: {
						name: body.tag
					}
				});

				tag = tag[0];

				let tagId = tag.id;

				// update the article
				yield article
						.update({
							title: body.title,
							content: body.content,
							tag_id: tagId
						}, {
							transaction: transaction
						});

				transaction.commit();

				this.body = {
					statusCode: 200,
					reasonPhrase: "OK",
					description: "update article succeed"
				};
				return ;
			}
			catch (error) {
				transaction.rollback();

				this.status = 500;
				this.body = {
					statusCode: 500,
					reasonPhrase: "Internal Server Error",
					description: "update article fialed",
					errorCode: 1004
				};
				return ;
			}
		}
	);

// delete an article
router
	.delete(
		"/articles/:id",
		getToken,
		getIdentity,
		permissionsFilter({
			or: [
				"deletet_articles",
				"delete_private_articles"
			]
		}),
		function* (next) {
			let id = parseInt(this.params.id, 10);

			if (isNaN(id)) {
				this.status = 404;
				return ;
			}

			let article = Article.find({
				where: {
					id:id
				}
			});

            if (article === null) {
                this.status = 404;
				return ;
            }

			// start transaction
			let transaction = yield sequelize.transaction();
			// delete article
			try {
				yield Article
						.destroy({
							where: {
								id: id
							},
							transaction: transaction
						});

				transaction.commit();

				this.body = {
					statusCode: 200,
					reasonPhrase: "OK",
					description: "delete article succeed"
				};
				return ;
			}
			catch (error) {
				transaction.rollback();

				this.status = 500;
				this.body = {
					statusCode: 500,
					reasonPhrase: "Internal Server Error",
					description: "delete article fialed",
					errorCode: 1005
				};
				return ;
			}
		}
	);

module.exports = router.routes();
