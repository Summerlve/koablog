"use strict";
// set router
const router = require("koa-router")();
const prefix = "/users"; // router's prefix
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
const checkUser = require("../middlewares/checkUser");

// page of authors
router.get("/", function* (next) {
	// page默认为1
	let current = parseInt(this.query.page || 1, 10);

	// page and row
	const limit = 4;
	// 一行有numPerRow个作者，因为bootstrap的栅格一行有12列，所以此处必须能把12整除
	const usersPerRow = 2;

	let users = yield User.findAll({
		order: ["id"],
		offset: (current - 1) * limit,
		limit: limit
	});

	if (users.length === 0) {
		this.status = 404;
		this.body = "没有更多的作者了";
		return ;
	}

	let count = yield User.count();

	let previous = current - 1;
	let next_ = count - limit * current > 0 ? current + 1 : 0;

	this.body = yield render("/frontend/users/users", {
		title: "Users",
		users: users,
		page: {
			urlPrefix: "/users",
			current: current,
			previous: previous,
			next: next_
		},
		usersPerRow: usersPerRow
	});
});

// one of the author
router.get("/:id", checkUser, function* (next) {
	// get user from checkUser
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

			this.body = yield render("/frontend/users/details", {
				user: user,
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
	verifyToken,
	getIdentity,
	permissionsFilter({
		and: ["create_users", "read_groups"]
	}),
	function* (next) {
		let body = yield parse.form(this);

		// create a new user
		let username = body.username;
		let password = body.password;
		let penName = body.penName;
		let groupName = body.groupName;
		let avatar = body.avatar;
		let introduce = body.introduce;

		if (!username || !password || !penName || !groupName) {
			this.status = 400;
			this.body = {
				statusCode: 400,
				reasonPhrase: "Bad Request",
				description: "username, password, penName, groupName is required, and must be not void",
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

		//start transaction
		let transaction = yield sequelize.transaction();

		try {
			let user = yield User.build({
				username: body.username,
				password: MD5(body.password),
				pen_name: body.penName,
				avatar: body.avatar || undefined,
				introduce: body.introduce || undefined,
				group_id: groupId
			})
			.save({
				transaction: transaction
			});

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
	verifyToken,
	getIdentity,
	permissionsFilter({
		or: ["update_users", "update_private_users"]
	}),
	checkUser,
	function* (next) {
		// get user from checkUser
		let user = this.user;

		let body = yield parse.form(this);

		// check which items need to update
		let username = "";
		let password = "";
		let penName = "";
		let introduce = "";

		let updater = {};

		if ("username" in body) {
			username = body.username;

			if (!username) {
				this.status = 400;
				this.body = {
					statusCode: 400,
					reasonPhrase: "Bad Request",
					description: "this item cannot be empty can't be void",
					errorCode: 2006
				};
				return ;
			}

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

			updater.username = username;
		}

		if ("penName" in body) {
			penName = body.penName;

			if (!penName) {
				this.status = 400;
				this.body = {
					statusCode: 400,
					reasonPhrase: "Bad Request",
					description: "this item cannot be empty can't be void",
					errorCode: 2006
				};
				return ;
			}

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

			updater.pen_name = penName;
		}

		if ("password" in body) {
			password = body.password;

			if (!password) {
				this.status = 400;
				this.body = {
					statusCode: 400,
					reasonPhrase: "Bad Request",
					description: "this item cannot be empty can't be void",
					errorCode: 2006
				};
				return ;
			}

			updater.password = MD5(password);
		}

		if ("introduce" in body) {
			introduce = body.introduce;
			updater.introduce = introduce;
		}

		let transaction = yield sequelize.transaction();

		try {
			yield user.update(updater, {
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

// change user's group
router.put("/:id/group",
	verifyToken,
	getIdentity,
	permissionsFilter({
		only: "promote_users"
	}),
	checkUser,
	function* (next) {
		let body = yield parse.form(this);
		let targetGroupName = body.groupName;

		// check group whether exist
		let targetGroup = yield Group.find({
			where: {
				name: targetGroupName
			}
		});

		let hasGroup = targetGroup === null ? false : true

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

		let targetGroupId = targetGroup.id;

		// get user from checkUser
		let user = this.user;

		let transaction = yield sequelize.transaction();

		try {
			yield user.update({
				group_id: targetGroupId
			}, {
				transaction: transaction
			});

			transaction.commit();

			this.body = {
				statusCode: 200,
				reasonPhrase: "OK",
				description: "change user's group succeed",
				groupId: targetGroupId,
				groupName: targetGroupName
			};
			return ;
		}
		catch (e) {
			transaction.rollback();

			this.status = 500;
			this.body = {
				statusCode: 500,
				reasonPhrase: "Internal Server Error",
				description: "change user's group failed",
				errorCode: 2007
			};
			return ;
		}
	}
);

// delete a user
router.delete("/:id",
	verifyToken,
	getIdentity,
	permissionsFilter({
		only: "delete_users"
	}),
	checkUser,
	function* (next) {
		// get user from checkUser
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
				description: "delete user succeed",
				userId: id
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
				errorCode: 2008
			};
			return ;
		}
	}
);

module.exports = router.routes();
