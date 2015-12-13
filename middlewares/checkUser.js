"use strict";
// check whether user excist
const User = require("../models/User");

module.exports = function checkUser(context) {
    return function* () {
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
			this.status = 404;
			return ;
		}

        // add to context
        this.user = user;
    }.bind(context)();
};
