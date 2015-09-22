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
let redisClient = redis.createClient(6379, host, {});

redisClient.on("error", (error) => {
	console.log("Redis Error", error);
});

// 对redis的exist方法的promise封装
// Node 0.12.7版本对于箭头函数的实现不对，因此还是需要hackthis
redisClient.co_exists = function (key) {
	let self = this;
    return new Promise((resolve, reject) => {
        self.exists(key, (error, reply) => {
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
