"use strict";
// check whether user excist
const User = require("../models/User");

module.exports = function* checkUser(next) {
    let id = parseInt(this.params.id, 10);

	if (isNaN(id)) {
		this.status = 404;
		return ;
	}

	let user = yield User.find({
        attributes: ["id", "username", "pen_name", "introduce", "avatar", "group_id"],
		where: {
			id: id
		}
	});

	if (user === null) {
        switch (this.accepts("json", "html")) {
            case "html": {
                this.status = 404;
                return ;
            }break;
            case "json": {
                this.status = 404;
                this.body = {
                    statusCode: 404,
					reasonPhrase: "Not Found",
					description: "user dont exists"
                };
                return ;
            }break;
            default: {
                // 只允许json和html。
    			this.throw(406, "json and html only");
    			return ;
            }
        }
		return ;
	}

    // add to context
    this.user = user;

    yield next;
};
