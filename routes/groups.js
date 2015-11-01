"use strict";

const router = require("koa-router")();
const Group = require("../models/Group");

router
    .get(
        "/groups",
        function* (next) {
            // return all (just 2 group) groups
            let groups = yield Group.findAll();
            this.body = groups;
            return ;
        }
    );

router
    .get(
        "/groups/:id",
        function* (next) {
            let id = parseInt(this.params.id, 10);

			if (isNaN(id)) {
				this.status = 404;
				return ;
			}

            let group = yield Group.find({
                where: {
                    id: id
                }
            });

            switch (this.accepts("html", "json")) {
                case "html": {
                    this.body = "123123";
                }break;
                case "json": {
                    this.body = group;
                    return ;
                }break;
                default: {

                }
            }
        }
    );

module.exports = router.routes();
