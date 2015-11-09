"use strict";
// set router
const router = require("koa-router")();
const prefix = "/authors"; // router's prefix
router.prefix(prefix); // set router's prefix

// import modules
const views = require("co-views");
const User = require("../models/User");
const ArticleView = require("../models/Article").ArticleView;
const parse = require("co-body");
const MD5 = require("md5");
const sequelize = global.sequelize;

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
	.get("/", function* (next) {
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
		"/:id",
		function* (next) {
			let id = parseInt(this.params.id, 10);

			if (isNaN(id)) {
				this.status = 404;
				return ;
			}

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

			switch (this.accepts("json", "html")) {
				case "html": {
					// get the pen_name
					let penName = author.pen_name;

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
				case "json": {
					this.body = author;
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

// create a new user
router
	.post(
		"/",
		getToken,
		getIdentity,
		permissionsFilter({
			and: [
				"create_users"
			]
		}),
		function* (next) {
			let body = yield parse.form(this);

			//start transaction
			let transaction = yield sequelize.transaction();

			// create a new user
			try {
				yield User
						.build({
							username: body.username,
							password: MD5(body.password),
							pen_name: body.penName,
							avatar: body.avatar || void 0,
							introduce: body.introduce || void 0,
							group_id: parseInt(body.groupId, 10) // String -> Number
						})
						.save();

				transaction.commit();

				this.body = {
					statusCode: 200,
					reasonPhrase: "OK",
					description: "add user succeed"
				};
				return ;
			}
			catch (error) {
				console.log(error);
				transaction.rollback();

				this.status = 500;
				this.body = {
					statusCode: 500,
					reasonPhrase: "Internal Server Error",
					description: "add author fialed",
					errorCode: 1004
				};
				return ;
			}
		}
	);

// update a user
router
	.put(
		"/:id",
		getToken,
		getIdentity,
		permissionsFilter({
			or: [
				"update_users",
				"update_private_users"
			]
		}),
		function* (next) {
			// 修改用户的设置，除了koablog_user的id不能更改以外，其他的都可以更改的
			let id = parseInt(this.params.id, 10);

			if (isNaN(id)) {
				this.status = 404;
				return ;
			}

			let user = yield User.find({
				where: {
					id: id
				}
			});

			if (user === null) {
				this.status = 404;
				return;
			}

			let body = yield parse.form(this);

			// change the user
			let username = body.username || undefined;
			let password = body.password || undefined;
			let penName = body.penName || undefined;

			// check username and pen_name , it's the unique key
			let avatar = body.avatar || undefined;
			let introduce = body.introduce || undefined;
			let groupId = body.groupId || undefined;

			// root can change group_id
			// author can not change group_id

		}
	);

// delete a user
router
	.delete(
		"/:id",
		getToken,
		getIdentity,
		permissionsFilter({
			and: [
				"delete_users"
			]
		}),
		function* (next) {
			let id = parseInt(this.params.id, 10);

			if (isNaN(id)) {
				this.status = 404;
				return ;
			}

			console.log(id);

			let user = yield User.find({
				where: {
					id: id
				}
			});

			if (user === null) {
				this.status = 404;
				return ;
			}

			let transaction = yield sequelize.transaction();

			try {
				yield User
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
					description: "delete user succeed"
				};
				return ;
			}
			catch (error) {
				transaction.rollback();
				console.log(error);
				this.status = 500;
				this.body = {
					statusCode: 500,
					reasonPhrase: "Internal Server Error",
					description: "delete user fialed",
					errorCode: 1005
				};
				return ;
			}
		}
	);

module.exports = router.routes();
