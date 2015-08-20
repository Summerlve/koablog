/*	database config
 *	use Sequelize ORM
 *
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

/*	path config
 *	set views's path	
 *	set static file's path
 *
 *
 *
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


