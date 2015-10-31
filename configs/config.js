"use strict";
/*	database config
 *	use Sequelize ORM
 */
const Sequelize = require("sequelize");
const sequelize = new Sequelize("koablog", "root", "123456", {
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
const redis = require("redis");
const host = "127.0.0.1";
const port = 6379;
const redisClient = redis.createClient(port, host, {});

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
const path = require("path");
const root = path.dirname(__dirname); // Located in the root directory of the project

global.path = {};
global.path.static = path.join(root, "public");
global.path.views = path.join(root, "views");

/* token settings
 *
 */
global.cert = "koaBlog";
