var Sequelize = require("sequelize");
var sequelize = global.sequelize;

var Group = sequelize.define("koablog_group", {
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

var GroupToUser = sequelize.define("koablog_group_to_user", {
	id: {
		type: Sequelize.INTEGER(11),
		primaryKey: true,
		allowNull: false,
		unique: true,
		field: "id"
	},
	group_id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		field: "group_id"
	},
	user_id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		field: "user_id"
	}
})

module.exports = {
	Group: Group,
	GroupToUser: GroupToUser
};
