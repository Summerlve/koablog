"use strict";
// set router
const router = require("koa-router")();
const prefix = "/tags";
router.prefix(prefix);

// import module
const Tag = require("../models/Tag");
const views = require("co-views");
const parse = require("co-body");
const sequelize = global.sequelize;

// path
const viewsPath = global.path.views;

// row
const tagsPerRow = 6; // 每行6个tag

// render
const render = views(viewsPath, {
	map: {
		html: "ejs"
	}
});

// import middlewares
const verifyToken = require("../middlewares/verifyToken");
const getIdentity = require("../middlewares/getIdentity");
const filter = require("../middlewares/permissionsFilter");
const checkTag = require("../middlewares/checkTag");

// return all tags
router.get("/", function* (next) {
	switch (this.accepts(["html", "json"])) {
		case "html": {
			let tags = yield Tag.findAll({
				order: ["id"]
			});

			this.body = yield render("/frontend/tags/tags", {
				tags: tags,
				title: "Tags",
				tagsPerRow: tagsPerRow
			});
			return ;
		}break;
		case "json": {
			let tags = yield Tag.findAll({
				order: ["id"]
			});

			this.body = tags;
			return ;
		}break;
		default: {
			this.throw(406, "json and html only");
			return ;
		}
	}
});

// return one of tags
router.get("/:id", checkTag, function* (next) {
	// get target tag from checkTag
	let tag = this.tag;

	switch (this.accepts(["html", "json"])) {
		case "html": {
			this.body = tag;
			return ;
		}break;
		case "json": {
			this.body = tag;
			return ;
		}break;
		default: {
			this.throw(406, "json and html only");
			return ;
		}
	}
});

// create tag
router.post("/",
	verifyToken,
	getIdentity,
	filter({
		only: "create_tags"
	}),
	function* (next) {
		let body = yield parse.form(this);
		let tagName = body.tagName;

		if (!tagName) {
			this.status = 400;
			this.body = {
				statusCode: 400,
				reasonPhrase: "Bad Request",
				description: "tag's name can not be void",
				errorCode: 4001
			};
			return ;
		}

		let transaction = yield sequelize.transaction();

		try {
			// create tag if no exist
			let tag = yield Tag.findOrCreate({
				where: {
					name: tagName
				},
				transaction: transaction
			});

			tag = tag[0];

			let tagId = tag.id;

			transaction.commit();

			this.body = {
				statusCode: 200,
				reasonPhrase: "OK",
				description: "add tag succeed",
				tagId: tagId
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
				description: "add tag fialed",
				errorCode: 4000
			};
		}
	}
);

// update a tag's info
router.put("/:id",
	verifyToken,
	getIdentity,
	filter({
		only: "update_tags"
	}),
	checkTag,
	function* (next) {
		let body = yield parse.form(this);
		let tagName = body.tagName;

		if (!tagName) {
			this.status = 400;
			this.body = {
				statusCode: 400,
				reasonPhrase: "Bad Request",
				description: "tag's name can not be void",
				errorCode: 4001
			};
			return ;
		}

		// check this tagName whether exists
		let hasTag = (yield Tag.find({
			where: {
				name: tagName
			}
		})) === null ? false : true;

		if (hasTag) {
			this.status = 400;
			this.body = {
				statusCode: 400,
				reasonPhrase: "Bad Request",
				description: "this tag name already exists",
				errorCode: 4004
			};
			return ;
		}

		// get target tag from checkTag
		let tag = this.tag;

		let transaction = yield sequelize.transaction();

		try {
			yield tag.update({
				name: tagName
			}, {
				transaction: transaction
			});

			transaction.commit();

			this.body = {
				statusCode: 200,
				reasonPhrase: "OK",
				description: "update tag succeed"
			};
			return ;
		}
		catch (error) {
			transaction.rollback();

			this.status = 500;
			this.body = {
				statusCode: 500,
				reasonPhrase: "Internal Server Error",
				description: "update tag failed",
				errorCode: 4002
			};
			return ;
		}
	}
);

// delete a tag
router.delete("/:id",
	verifyToken,
	getIdentity,
	filter({
		only: "delete_tags"
	}),
	checkTag,
	function* (next) {
		let tag = this.tag;
		let id = tag.id;

		let transaction = yield sequelize.transaction();

		try {
			yield Tag.destroy({
				where: {
					id: id
				},
				transaction: transaction
			});

			transaction.commit();

			this.body = {
				statusCode: 200,
				reasonPhrase: "OK",
				description: "delete tag succeed",
				tagId: id
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
				description: "delete tag failed",
				errorCode: 4003
			};
			return ;
		}
	}
);

module.exports = router.routes();
