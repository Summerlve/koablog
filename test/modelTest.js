var Sequelize = require("sequelize");
var sequelize = new Sequelize("blog", "root", "123456cxzse$", {
	host: "localhost",
	dialect: "mysql",
	port: 3306,
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
	define: {	
		freezeTableName: true,
		timestamps: false
	}
});

var admin = sequelize.define("admin", {
	aid: {
		type: Sequelize.INTEGER,
		allowNull: true,
		unique: true,
		primaryKey: true,
		field: "aid"
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		field: "username"
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: false,
		field: "password"
	}
});

admin
	.findOne({
		where: {
			username: "test",
			password: "test"
		}
	}, function (err, result) {
		console.log(result);
	});