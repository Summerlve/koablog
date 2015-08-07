var router = require("koa-router")();
var views = require("co-views");
var User = require("../models/User");
var Article = require("../models/Article");

// path
var viewsPath = global.path.views;

// page and row
var limit = global.page.limit;
var authorsPerRow = 2; // 一行有numPerRow个作者，因为bootstrap的栅格一行有12列，所以此处必须能把12整除

// render
var render = views(viewsPath, {
	map: {
		html: "ejs"
	}
});

// page of authors
router
	.get("/authors", function* (next) {
		// page默认为1
		var current = parseInt(this.query.page || 1, 10);

		var authors = yield User.findAll({
			order: ["id"],
			offset: (current - 1) * limit,
			limit: limit
		});

		if (authors.length === 0) {
			this.status = 404;
			this.body = "没有更多的作者了";
			return ;
		}

		var count = yield User.count();

		var previous = current - 1;
		var next_ = count - limit * current > 0 ? current + 1 : 0;

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
		var pen_name = this.params.pen_name;

		var author = yield User.find({
			where: {
				pen_name: pen_name
			}
		});

		// get the newest 4 articles of this author
		var articles = yield Article.findAll({
			order: [
				["id", "DESC"]
			],
			where: {
				author: pen_name
			},
			limit: 4
		});
		
		console.log(articles.length);

		this.body = yield render("/frontend/authors/details", {
			author: author,
			articles: articles,
			title: author.pen_name
		});
	});

module.exports = router.routes();
