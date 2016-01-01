"use strict";
const Sequelize = require("sequelize");
const configs = require("../configs/configs");
const sequelize = configs.sequelize;

let Permission = sequelize.define("koablog_permission", {
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

let PermissionToGroup = sequelize.define("koablog_permission_to_group", {
    id: {
		type: Sequelize.INTEGER(11),
		primaryKey: true,
		allowNull: false,
		unique: true,
		field: "id"
	},
    permission_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        unique: false,
        field: "permission_id"
    },
    group_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        unique: false,
        field: "group_id"
    }
});

module.exports.Permission = Permission;
module.exports.PermissionToGroup = PermissionToGroup;
