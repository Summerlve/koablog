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

		var previous = current - 1;
		var next_ = authors.length === limit ? current + 1 : 0;

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
	.param("id", function* (id, next) {
		if (isNaN(parseInt(id, 10))) {
			this.status = 404;
			this.body = "author not found";
			return ;
		}
		else {
			this.id = id;
		}
		yield next;
	})
	.get("/authors/:id", function* (next) {
		var id = this.id;
		console.log(id);
	});
 
module.exports = router.routes();
