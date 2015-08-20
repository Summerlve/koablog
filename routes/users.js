var router = require("koa-router")();
var parse = require("co-body");
var User = require("../models/User");
var identity = require("../middlewares/identity");

router	
	.get("/users", function* (next) {
		if (!this.session.authenticated) {
			this.redirect("/login");
		} 
		else {
			var users = yield User.findAll({
				attributes: ["id", "username", "pen_name"]
			});
			
			this.body = users;
		}
	});

router
	.post(
		"/users",
		identity,
		function* (next) {
			var groupId = this.groupId;
			var permission
		});
	
module.exports = router.routes();