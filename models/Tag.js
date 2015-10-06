"use strict";
let Sequelize = require("sequelize");
let sequelize = global.sequelize;

let Tag = sequelize.define("koablog_tag", {
	id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		unique: true,
		primaryKey: true,
		field: "id"
	},
	name: {
		type: Sequelize.STRING(40),
		allowNull: false,
		unique: true,
		field: "name"
	}
});

module.exports = Tag;
