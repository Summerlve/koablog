var Sequelize = require("sequelize");
var sequelize = global.sequelize;
var User = require("./User");

var Article = sequelize.define("koablog_view_article", {
	id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		unique: true,
		primarKey: true,
		field: "id"
	},
	title: {
		type: Sequelize.STRING(40),
		allowNull: false,
		unique: false,
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
			var createAt = this.getDataValue("createAt");
			var time = [createAt.getFullYear(), createAt.getMonth() + 1, createAt.getDay() + 1].join("/"); 
			return time;
		}
	}
});

module.exports = Article;