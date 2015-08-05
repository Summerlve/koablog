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
		
		var previous = current - 1;
		var next_ = articles.length === limit ? current + 1 : 0;
		
		this.body = yield render("/frontend/articles", {
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

router
	.param("id", function* (id, next) {
		if (isNaN(parseInt(id, 10))) return this.status = 404;
		else this.id = id;
		yield next;
	})
	.get("/articles/:id", function* (next) {
		var article = yield Article.find({
			where: {
				id: this.id
			}
		});
		
		if (article !== null) {
			this.body = yield render("/frontend/details", {
				article: article 
			});
		}
		else {
			this.status = 404;
			this.body = "article not found";
		}
	});
	
module.exports = router.routes();