var Sequelize = require("sequelize");
var sequelize = global.sequelize;
var User = require("./User");

var Article = sequelize.define("koaBlog_view_article", {
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
		field: "createAt"
	}
});

module.exports = Article;