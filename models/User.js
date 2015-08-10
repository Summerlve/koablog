var Sequelize = require("sequelize");
var sequelize = global.sequelize;

var User = sequelize.define("koablog_user", {
	id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		unique: true,
		primarKey: true,
		field: "id"
	},
	username: {
		type: Sequelize.STRING(40),
		allowNull: false,
		unique: true,
		field: "username"	
	},
	password: {
		type: Sequelize.STRING(40),
		allowNull: false,
		unique: false,
		field: "password"
	},
	pen_name: {
		type: Sequelize.STRING(40),
		allowNull: false,
		unique: true,
		field: "pen_name"
	},
	avatar: {
		type: Sequelize.STRING(255),
		allowNull: true,
		unique: false,
		field: "avatar"
	},
	introduce: {
		type: Sequelize.STRING(255),
		allowNull: true,
		unique: false,
		field: "introduce"
	}
});

module.exports = User;