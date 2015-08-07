var router = require("koa-router")();
var Article = require("../models/Article");
var views = require("co-views");
// path
var viewsPath = global.path.views;
// page
var limit = global.page.limit;
// render
var render = views(viewsPath, {
	map: {
		html: "ejs"
	}
});

// redirect / to the /articles
router
	.redirect("/", "/articles");

// page of the articles
router
	.get("/articles", function* (next) {
		// page默认为1
		var current = parseInt(this.query.page || 1, 10);
		
		var articles = yield Article.findAll({
			order: ["id"],
			offset: (current - 1) * limit,
			limit: limit
		});

		if (articles.length === 0) {
			this.status = 404;
			this.body = "没有更多的内容了";
			return ;
		}
		
		var count = yield Article.count();
		 
		var previous = current - 1;
		var next_ = count - limit * current > 0 ? current + 1 : 0;

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
		var id = parseInt(this.id, 10);

		var article = yield Article.find({
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
		var previous = yield Article.find({
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
		
		var next_ = yield Article.find({
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

module.exports = router.routes();
