"use strict";
const Group = require("../models/Group");

module.exports = function* checkGroup (next) {
    let id = parseInt(this.params.id, 10);

    if (isNaN(id)) {
        this.status = 404;
        return ;
    }

    let group = yield Group.find({
        attributes: ["id", "name", "description"],
        where: {
            id: id
        }
    });

    if (group === null) {
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
					description: "group dont exists"
                };
                return ;
            }break;
            default: {
                // 只允许json和html。
    			this.throw(406, "json and html only");
    			return ;
            }
        }
    }

    // add to context
    this.group = group;
    
    yield next;
};
