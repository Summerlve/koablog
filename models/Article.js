"use strict";
let Sequelize = require("sequelize");
let sequelize = global.sequelize;
let User = require("./User");
let Tag = require("./Tag");
let moment = require("moment");

let ArticleView = sequelize.define("koablog_view_article", {
	id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		unique: true,
		primaryKey: true,
		field: "id"
	},
	title: {
		type: Sequelize.STRING(40),
		allowNull: false,
		field: "title"
	},
	author: {
		type: Sequelize.STRING(40),
		allowNull: false,
		unique: false,
		field: "author"
	},
	content: {
		type: Sequelize.TEXT,
		allowNull: false,
		field: "content"
	},
	tag: {
		type: Sequelize.STRING(40),
		allowNull: false,
		field: "tag"
	},
	createAt: {
		type: Sequelize.DATE,
		allowNull: false,
		field: "createAt",
		get: function () {
			// 时间处理就是个坑
			let createAt = this.getDataValue("createAt");
			// 转换成ISO 8601的时间字符串
			createAt = createAt.toISOString();
			// 用moment.js格式化成UTC＋8(东八区)
			createAt = moment(createAt, "YYYY-MM-DD HH:mm:ss").format();
			// 返回的createAt是字符串
			return createAt;
		}
	}
});

let Article = sequelize.define("koablog_article", {
	id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		unique: true,
		primaryKey: true,
		autoIncrement: true,
		field: "id"
	},
	title: {
		type: Sequelize.STRING(40),
		allowNull: false,
		field: "title"
	},
	user_id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		field: "user_id",
		references: {
			model: User,
			key: "id"
		}
	},
	content: {
		type: Sequelize.TEXT,
		allowNull: false,
		field: "content"
	},
	tag_id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		field: "tag_id",
		references: {
			model: Tag,
			key: "id"
		}
	},
	createAt: {
		type: Sequelize.DATE,
		field: "createAt",
	}
});

module.exports.ArticleView = ArticleView;
module.exports.Article = Article;
