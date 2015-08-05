var router = require("koa-router")();
var parse = require("co-body");
var User = require("../models/User");

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
	.post("/users", function* (next) {
		var user = yield parse(this);
		console.log(123123);
		console.log(user);
		this.body = {
			statusCode: 201,
			reasonPhrase: "create succeed"	
		};
	});
	
module.exports = router.routes();