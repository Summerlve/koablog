"use strict";
const Tag = require("../models/Tag");

module.exports = function* checkTag (next) {
    let id = parseInt(this.params.id, 10);

    if (isNaN(id)) {
        this.status = 404;
        return ;
    }

    let tag = yield Tag.find({
        attributes: ["id", "name"],
        where: {
            id: id
        }
    });

    if (tag === null) {
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
					description: "tag dont exists"
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
    this.tag = tag;
    
    yield next;
};
