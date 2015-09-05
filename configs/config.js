/*	database config
 *	use Sequelize ORM
 */
var Sequelize = require("sequelize");
var sequelize = new Sequelize("koablog", "root", "123456cxzse$", {
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
var redis = require("redis");
var host = "127.0.0.1";
var redisClient = redis.createClient(6379, host, {});

redisClient.on("error", (error) => {
	console.log("Redis Error", error);
});

// 对于redis实例方法的promise封装。
redisClient.co_get = function (key) {
    return new Promise((resolve, reject) => {
        this.get(key, (error, reply) => {
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
var path = require("path");
var root = path.dirname(__dirname); // Located in the root directory of the project

global.path = {};
global.path.static = path.join(root, "public");
global.path.views = path.join(root, "views");

/* token settings
 *
 */
global.cert = "koaBlog";
