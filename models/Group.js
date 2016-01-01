"use strict";
const Sequelize = require("sequelize");
const configs = require("../configs/configs");
const sequelize = configs.sequelize;

let Group = sequelize.define("koablog_group", {
	id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		unique: true,
		primaryKey: true,
		autoIncrement: true,
		field: "id"
	},
	name: {
		type: Sequelize.STRING(40),
		allowNull: false,
		unique: true,
		field: "name"
	},
	description: {
		type: Sequelize.STRING(100),
		allowNull: true,
		field: "description"
	}
});

module.exports = Group;
