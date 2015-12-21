"use strict";
const Sequelize = require("sequelize");
const redis = require("redis");
const path = require("path");
const configs = global.configs;

/*	database config
 *	use Sequelize ORM
 */
const dbHost = configs.mysql.host;
const dbPort = configs.mysql.port;
const dbUsername = configs.mysql.username;
const dbPassword = configs.mysql.password;

const sequelize = new Sequelize("koablog", "root", "123456", {
	host: dbHost,
	dialect: "mysql",
	port: dbPort,
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
const redisHost = configs.redis.host;
const redisPort = configs.redis.port;
const redisClient = redis.createClient(redisPort, redisHost, {});

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
const root = path.dirname(__dirname); // Located in the root directory of the project

global.path = {};
global.path.static = path.join(root, "public");
global.path.views = path.join(root, "views");

/* token settings
 *
 */
global.cert = "koaBlog";
