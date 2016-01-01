"use strict";
// set router
const router = require("koa-router")();
const prefix = "/articles";
router.prefix(prefix);

// import modules
const configs = require("../configs/configs");
const ArticleView = require("../models/Article").ArticleView;
const Article = require("../models/Article").Article;
const Tag = require("../models/Tag");
const views = require("co-views");
const parse = require("co-body");
const sequelize = configs.sequelize;

// path
const viewsPath = configs.path.views;

// page
const limit = 5;

// render
const render = views(viewsPath, {
	map: {
		html: "ejs"
	}
});

// import middlewares
const verifyToken = require("../middlewares/verifyToken");
const getIdentity = require("../middlewares/getIdentity");
const permissionsFilter = require("../middlewares/permissionsFilter");
const checkArticle = require("../middlewares/checkArticle");

// page of the articles
router.get("/", function* (next) {
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
router.get("/:id", checkArticle, function* (next) {
	// get target article from checkArticle
	let article = this.article;
	let id = article.id;

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
});

// add new article
// 在创建文章时，title、tag、content都需要有并且都不能为空
router.post("/",
	verifyToken,
	getIdentity,
	permissionsFilter({
		and: ["create_articles", "create_tags"]
	}),
	function* (next) {
		let body = yield parse.form(this);

		let title = body.title;
		let tagName = body.tag;
		let content = body.content;

		if (!title || !tagName || !content) {
			this.status = 400;
			this.body = {
				statusCode: 400,
				reasonPhrase: "Bad Request",
				description: "title, tag, content is required, and must be not void",
				errorCode: 3000
			};
			return ;
		}

		// get userId from getIdentity.js
		let userId = this.userId;

		let transaction = yield sequelize.transaction();

		try {
			// create tag if no exist
			let tag = yield Tag.findOrCreate({
				where: {
					name: tagName
				}
			});

			tag = tag[0];

			let tagId = tag.id;

			yield Article.build({
				title: title,
				tag_id: tagId,
				content: content,
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
			console.error(error);
			transaction.rollback();

			this.status = 500;
			this.body = {
				statusCode: 500,
				reasonPhrase: "Internal Server Error",
				description: "add article fialed",
				errorCode: 3001
			};
			return ;
		}
	}
);

// update an article
// 目前只能更新：title、content、tag_id
// title和tag不能为空，content可以更新为空
// 更新tag_id是检查tag是否存在，如果不存在就添加新的tag，在改变tag_id
router.put("/:id",
	verifyToken,
	getIdentity,
	permissionsFilter({
		and: [
			"create_tags",
			{or: ["update_articles", "update_private_articles"]}
		]
	}),
	checkArticle,
	function* (next) {
		// get tar article from checkArticle
		let articleId = this.article.id;

		let body = yield parse.form(this);

		// check which filed need to update
		let tagName = "";
		let title = "";
		let content = "";

		let updater = {};

		if ("title" in body) {
			title = body.title;

			if (!title) {
				this.status = 400;
				this.body = {
					statusCode: 400,
					reasonPhrase: "Bad Request",
					description: "this item cannot be empty can't be void",
					errorCode: 3002
				};
				return ;
			}

			updater.title = title;
		}

		if ("tag" in body) {
			tagName = body.tag;

			if (!tagName) {
				this.status = 400;
				this.body = {
					statusCode: 400,
					reasonPhrase: "Bad Request",
					description: "this item cannot be empty can't be void",
					errorCode: 3002
				};
				return ;
			}

			let tag = yield Tag.findOrCreate({
				where: {
					name: tagName
				}
			});

			tag = tag[0];
			updater.tag_id = tag.id;
		}

		if ("content" in body) {
			// content可以更新为空
			content = body.content;
			updater.content = content;
		}

		// 从checkArticle哪里获取的article是视图的实例不能update，所以从表里在检索一次，拿到表的实例就可以update了。
		// 这是很差的解决方法...

		let transaction = yield sequelize.transaction();

		try {
			yield Article.update(updater, {
				where: {
					id: articleId
				},
				transaction: transaction
			});

			transaction.commit();

			this.body = {
				statusCode: 200,
				reasonPhrase: "OK",
				description: "update article succeed",
				articleId: articleId
			};
			return ;
		}
		catch (error) {
			console.error(error);
			transaction.rollback();

			this.status = 500;
			this.body = {
				statusCode: 500,
				reasonPhrase: "Internal Server Error",
				description: "update article failed",
				errorCode: 3003
			};
			return ;
		}
	}
);

// delete an article
router.delete("/:id",
	verifyToken,
	getIdentity,
	permissionsFilter({
		or: ["deletet_articles", "delete_private_articles"]
	}),
	checkArticle,
	function* (next) {
		// get article from checkArticle
		let id = this.article.id;

		let transaction = yield sequelize.transaction();

		try {
			yield Article.destroy({
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
			console.error(error);
			transaction.rollback();

			this.status = 500;
			this.body = {
				statusCode: 500,
				reasonPhrase: "Internal Server Error",
				description: "delete article failed",
				errorCode: 3004
			};
			return ;
		}
	}
);

module.exports = router.routes();
