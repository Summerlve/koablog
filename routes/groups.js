"use strict";

const router = require("koa-router")();
const Group = require("../models/Group");
const permissionsFilter = require("../middlewares/permissionsFilter");
const verifyToken = require("../middlewares/verifyToken");
const getIdentity = require("../middlewares/getIdentity");

router.get("/groups",
    verifyToken,
	getIdentity,
    permissionsFilter({
        only: "read_groups"
    }),
    function* (next) {
        // return all (just 2 group, may be will have more groups) groups
        let groups = yield Group.findAll();
        this.body = groups;
        return ;
    }
);

router.get("/groups/:id",
    verifyToken,
	getIdentity,
    permissionsFilter({
        only: "read_groups"
    }),
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
                this.body = group;
                return ;
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

// create a new group
router.post("/groups",
    verifyToken,
    getIdentity,
    permissionsFilter({
        only: "create_groups"
    }),
    function* (next) {

    }
);

// update a group
router.put("/groups",
    verifyToken,
    getIdentity,
    permissionsFilter({
        only: "update_groups"
    }),
    function* (next) {

    }
);

// delete a group
router.delete("/groups",
    verifyToken,
    getIdentity,
    permissionsFilter({
        only: "delete_groups"
    }),
    function* (next) {

    }
);

module.exports = router.routes();
