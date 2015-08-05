var router = require("koa-router")();
var User = require("../models/User");
var views = require("co-views");
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
		
		var previous = current - 1;
		var next_ = authors.length === limit ? current + 1 : 0;
		
		this.body = yield render("/frontend/authors", {
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

router
	.get("/authors/:author/articles", function * (next) {
		var page = this.query.page;
		console.log(page);
		this.body = page;
	});

router
	.get("/authors/:author/profile", function* (next) {		
		var author = this.params.author;
		
		// 判断作者是否存在
		var user = yield User.find({
			attributes: ["id"],
			where: {
				pen_name: author
			}	
		});
		
		if (user === null) {
			this.status = 404;
			this.body = "can not found this author";
			return ;
		}
		
		// 返回该作者的所有文章（也需要分页）
		var articles = yield Article.findAll({
			where: {
				author: author
			},
			order: ["id"],
			offset: 1,
			limit: 5
		});
		
		if (articles.length === 0) {
			this.body = "this author don't have any article";
		}
		else {
			this.body = articles;
		}
	});
	
module.exports = router.routes();