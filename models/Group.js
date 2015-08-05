var Sequelize = require("sequelize");
var sequelize = global.sequelize;

var Group = sequelize.define("koaBlog_group", {
	id: {
		type: Sequelize.INTEGER(11),
		primaryKey: true,
		allowNull: false,
		unique: true,
		field: "id"
	},
	name: {
		type: Sequelize.STRING(40),
		allowNull: false,
		unique: true,
		field: "name"
	}
});

module.exports = Group;