"use strict";
/*	database config
 *	use Sequelize ORM
 */
let Sequelize = require("sequelize");
let sequelize = new Sequelize("koablog", "root", "123456", {
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

global.sequelize = sequelize;

/* redis
 * use redis to store token
 */
// create redis socket , and listening to the error event.
let redis = require("redis");
let host = "127.0.0.1";
let port = 6379;
let redisClient = redis.createClient(port, host, {});

redisClient.on("error", (error) => {
	console.log("Redis Error", error);
});

// 对redis的exist方法的promise封装
redisClient.co_exists = function (key) {
    return new Promise((resolve, reject) => {
        this.exists(key, (error, reply) => {
            if (error) reject(error);
            else resolve(reply);
        });
    });
};

global.redisClient = redisClient;

/*	path config
 *	set views's path
 *	set static file's path
 */
let path = require("path");
let root = path.dirname(__dirname); // Located in the root directory of the project

global.path = {};
global.path.static = path.join(root, "public");
global.path.views = path.join(root, "views");

/* token settings
 *
 */
global.cert = "koaBlog";

/* add permissions to global
 *	this is a map from id to name , get permissions's id by name.
 *  for more details , see the table 'koablog_permission'.
 */
let Permission = require("../models/Permission").Permission;
let allPermissions = new Map();

Permission
	.findAll()
	.then(
		(data) => {
			data.forEach((value) => {
				allPermissions.set(value.name, value.id);
			});
		},
		(error) => {
			console.error("get permissions error");
		}
	)
	.then(
		(value) => {
			// add permissions to global.permissions
			global.allPermissions = allPermissions;
		}
	);
