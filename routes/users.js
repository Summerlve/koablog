"use strict";
// set router
const koaRouter = require("koa-router");
const router = koaRouter();
const prefix = "/authors"; // router's prefix
router.prefix(prefix); // set router's prefix

// import modules
const views = require("co-views");
const User = require("../models/User");
const Group = require("../models/Group");
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
const checkUser = require("../middlewares/checkUser");

// page of authors
router.get("/", function* (next) {
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
router.get("/:id", function* (next) {
	yield* checkUser(this);
	let user = this.user;

	switch (this.accepts("json", "html")) {
		case "html": {
			// get the pen_name
			let penName = user.pen_name;

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
				author: user,
				articles: articles,
				title: penName
			});
			return ;
		}break;
		case "json": {
			this.body = user;
			return ;
		}break;
		default: {
			// 只允许json和html。
			this.throw(406, "json and html only");
			return ;
		}
	}
});

// create a new user
router.post("/",
	getToken,
	getIdentity,
	permissionsFilter({
		only: "create_users"
	}),
	function* (next) {
		let body = yield parse.form(this);

		//start transaction
		let transaction = yield sequelize.transaction();

		// create a new user
		let username = body.username;
		let password = body.password;
		let penName = body.penName;
		let avatar = body.avatar;
		let introduce = body.introduce;
		let groupName = body.groupName;

		if (!username || !password || !penName || !groupName) {
			this.status = 400;
			this.body = {
				statusCode: 400,
				reasonPhrase: "Bad Request",
				description: "username, password, penName, groupName is required",
				errorCode: 2000
			};
			return ;
		}

		// check is username exist
		let isUsernameExist = (yield User.find({
			where: {
				username: username
			}
		})) === null ? false : true;

		if (isUsernameExist) {
			this.status = 400;
			this.body = {
				statusCode: 400,
				reasonPhrase: "Bad Request",
				description: "username exist",
				errorCode: 2001
			};
			return ;
		}

		// check is pen_name exist
		let isPenNameExist = (yield User.find({
			where: {
				pen_name: penName
			}
		})) === null ? false : true;

		if (isPenNameExist) {
			this.status = 400;
			this.body = {
				statusCode: 400,
				reasonPhrase: "Bad Request",
				description: "penName exist",
				errorCode: 2002
			};
			return ;
		}

		// check group whether exist
		let group = yield Group.find({
			where: {
				name: groupName
			}
		});

		let hasGroup = group === null ? false : true

		if (!hasGroup) {
			this.status = 400;
			this.body = {
				statusCode: 400,
				reasonPhrase: "Bad Request",
				description: "group don't exists",
				errorCode: 2003
			};
			return ;
		}

		let groupId = group.id;

		try {
			let user = yield User.build({
				username: body.username,
				password: MD5(body.password),
				pen_name: body.penName,
				avatar: body.avatar || void 0,
				introduce: body.introduce || void 0,
				group_id: groupId
			})
			.save();

			transaction.commit();

			this.body = {
				statusCode: 200,
				reasonPhrase: "OK",
				description: "add user succeed",
				userId: user.id
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
				description: "add user failed",
				errorCode: 2004
			};
			return ;
		}
	}
);

// update a user
router.put("/:id",
	getToken,
	getIdentity,
	permissionsFilter({
		or: ["update_users", "update_private_users"]
	}),
	function* (next) {
		// 修改用户的设置
		// check whether user excist
		yield checkUser(this);
		let user = this.user;

		let body = yield parse.form(this);

		// change the user
		// check username and pen_name , it's the unique key
		let username = body.username || undefined;
		let password = body.password || undefined;
		let penName = body.penName || undefined;
		let introduce = body.introduce || undefined;

		// needs check penName and username whether unique
		if (penName) {
			let isPenNameExist = (yield User.find({
				where: {
					pen_name: penName
				}
			})) === null ? false : true;

			if (isPenNameExist) {
				this.status = 400;
				this.body = {
					statusCode: 400,
					reasonPhrase: "Bad Request",
					description: "penName exist",
					errorCode: 2002
				};
				return ;
			}
		}

		if (username) {
			let isUsernameExist = (yield User.find({
				where: {
					username: username
				}
			})) === null ? false : true;

			if (isUsernameExist) {
				this.status = 400;
				this.body = {
					statusCode: 400,
					reasonPhrase: "Bad Request",
					description: "username exist",
					errorCode: 2001
				};
				return ;
			}
		}

		let transaction = yield sequelize.transaction();

		try {
			yield user.update({
				username: username,
				pen_name: penName,
				password: password,
				introduce: introduce
			}, {
				transaction: transaction
			});

			transaction.commit();

			this.body = {
				statusCode: 200,
				reasonPhrase: "OK",
				description: "update user succeed"
			};
			return ;
		}
		catch (e) {
			transaction.rollback();

			this.status = 500;
			this.body = {
				statusCode: 500,
				reasonPhrase: "Internal Server Error",
				description: "update user failed",
				errorCode: 2005
			};
			return ;
		}
	}
);

// update user's password
router.put("/:id/password",
	getToken,
	getIdentity,
	permissionsFilter({
		or: ["update_users", "update_private_users"]
	}),
	function* (next) {
		//  check user excist
		yield* checkUser(this);
		let user = this.user;

		let body = yield parse.form(this);

		let password = body.password;

		if (!password) {
			// password can not be void
			this.status = 400;
			this.body = {
				statusCode: 400,
				reasonPhrase: "Bad Request",
				description: "password can't be void",
				errorCode: 2006
			};
			return ;
		}

		let transaction = yield sequelize.transaction();

		try {
			yield user.update({
				password: password
			}, {
				transaction: transaction
			});

			transaction.commit();

			this.body = {
				statusCode: 200,
				reasonPhrase: "OK",
				description: "update user's password succeed"
			};
			return ;
		}
		catch (e) {
			transaction.rollback();

			this.status = 500;
			this.body = {
				statusCode: 500,
				reasonPhrase: "Internal Server Error",
				description: "update user's password failed",
				errorCode: 2007
			};
			return ;
		}
	}
);

// update user's username
router.put("/:id/username",
	getToken,
	getIdentity,
	permissionsFilter({
		or: ["update_users", "update_private_users"]
	}),
	function* (next) {
		// check user
		yield* checkUser(this);
		let user = this.user;

		let body = yield parse.form(this);

		let username = body.username;

		if (!username) {
			// username can not be void
			return ;
		}

		let isUsernameExist = (yield User.find({
			where: {
				username: username
			}
		})) === null ? false : true;

		// 如果存在
		if (isUsernameExist) {
			this.body = {
				statusCode: 400,
				reasonPhrase: "Bad Request",
				description: "username excists",
				errorCode: 2001
			};

			return ;
		}

		let transaction = sequelize.transaction();

		try {
			yield user.update({
				username: username
			}, {
				transaction: transaction
			});

			transaction.commit();

			this.body = {
				statusCode: 200,
				reasonPhrase: "OK",
				description: "update user's username failed",
			};

			return ;
		}
		catch (e) {
			transaction.rollback();

			this.body = {
				statusCode: 500,
				reasonPhrase: "Internal Server Error",
				description: "update user's username failed",
				errorCode: 2008
			};
			return ;
		}
	}
);

//update user's pen_name
router.put("/:id/penName",
	getToken,
	getIdentity,
	permissionsFilter({
		or: ["update_users", "update_private_users"]
	}),
	function* (next) {

	}
);

//promote user's permission
router.put("/:id/groupdId",
	getToken,
	getIdentity,
	permissionsFilter({
		and: ["promote_users", "read_groups"]
	}),
	function* (next) {
		// check user
		yield* checkUser(this);
		let user = this.user;

		let body = yield parse.form(this);

		let groupName = body.groupName;

		let all = yield Group.findAll();
	}
);

// delete a user
router.delete("/:id",
	getToken,
	getIdentity,
	permissionsFilter({
		only: "delete_users"
	}),
	function* (next) {
		// check user
		yield* checkUser(this);
		let user = this.user;
		let id = user.id;

		let transaction = yield sequelize.transaction();

		try {
			yield User.destroy({
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
				description: "delete user failed",
				errorCode: 2011
			};
			return ;
		}
	}
);

module.exports = router.routes();
