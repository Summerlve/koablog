"use strict";
// set router
const router = require("koa-router")();

// import module
const permissionsFilter = require("../middlewares/permissionsFilter");
const verifyToken = require("../middlewares/verifyToken");
const getIdentity = require("../middlewares/getIdentity");
const checkGroup = require("../middlewares/checkGroup");
const Group = require("../models/Group");
const parse = require("co-body");
const sequelize = global.sequelize;

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
        let body = yield parse.form(this);

        let groupName = body.groupName;
        let description = body.description;

        if (!groupName) {
            // groupName can not be void
        }

        let transaction = yield sequelize.transaction();

        try {
            let group = yield Group.build({
                name: groupName,
                description: description
            })
            .save({
                transaction: transaction
            });

            transaction.commit();
        }
        catch (error) {
            console.error(eroor);
            transaction.rollback();
        }

    }
);

// update a group
router.put("/groups",
    verifyToken,
    getIdentity,
    permissionsFilter({
        only: "update_groups"
    }),
    checkGroup,
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
    checkGroup,
    function* (next) {
        // get group from checkGroup
        let group = this.group;

        
    }
);

module.exports = router.routes();
