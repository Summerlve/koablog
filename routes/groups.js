"use strict";
// set router
const router = require("koa-router")();
const prefix = "/groups"; // router's prefix
router.prefix(prefix); // set router's prefix

// import module
const permissionsFilter = require("../middlewares/permissionsFilter");
const verifyToken = require("../middlewares/verifyToken");
const getIdentity = require("../middlewares/getIdentity");
const checkGroup = require("../middlewares/checkGroup");
const Group = require("../models/Group");
const parse = require("co-body");
const sequelize = global.sequelize;

router.get("/",
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

router.get("/:id",
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
router.post("/",
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
            this.status = 400;
			this.body = {
				statusCode: 400,
				reasonPhrase: "Bad Request",
				description: "groupName can not be void",
				errorCode: 5000
			};
            return ;
        }

        let hasGroup = (yield Group.find({
			where: {
				name: groupName
			}
		})) === null ? false : true;

		if (hasGroup) {
			this.status = 400;
			this.body = {
				statusCode: 400,
				reasonPhrase: "Bad Request",
				description: "this group name already exists",
				errorCode: 5001
			};
			return ;
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

			this.body = {
				statusCode: 200,
				reasonPhrase: "OK",
                description: "create group succeed",
                groupId: group.id
			};
			return ;
        }
        catch (error) {
            console.error(error);
            transaction.rollback();

            this.status = 500;
            this.body = {
                statusCode: 500,
                reasonPhrase: "Internal Server Error",
                description: "create group failed",
                errorCode: 5002
            };
            return ;
        }
    }
);

// update a group
router.put("/:id",
    verifyToken,
    getIdentity,
    permissionsFilter({
        only: "update_groups"
    }),
    checkGroup,
    function* (next) {
        let body = yield parse.form(this);
		let groupName = body.groupName;

        if (!groupName) {
            this.status = 400;
			this.body = {
				statusCode: 400,
				reasonPhrase: "Bad Request",
				description: "groupName can not be void",
				errorCode: 5000
			};
			return ;
        }

        let hasGroup = (yield Group.find({
			where: {
				name: groupName
			}
		})) === null ? false : true;

		if (hasGroup) {
			this.status = 400;
			this.body = {
				statusCode: 400,
				reasonPhrase: "Bad Request",
				description: "this group name already exists",
				errorCode: 5001
			};
			return ;
		}

        let group = this.group;

        let transaction = yield sequelize.transaction();

		try {
			yield group.update({
				name: groupName
			}, {
				transaction: transaction
			});

			transaction.commit();

			this.body = {
				statusCode: 200,
				reasonPhrase: "OK",
				description: "update group succeed"
			};
			return ;
		}
		catch (error) {
			transaction.rollback();

			this.status = 500;
			this.body = {
				statusCode: 500,
				reasonPhrase: "Internal Server Error",
				description: "update group failed",
				errorCode: 5003
			};
			return ;
		}
    }
);

// delete a group
router.delete("/:id",
    verifyToken,
    getIdentity,
    permissionsFilter({
        only: "delete_groups"
    }),
    checkGroup,
    function* (next) {
        // get group from checkGroup
        let group = this.group;
        let id = group.id;

        let transaction = yield sequelize.transaction();

        try {
			yield Group.destroy({
				where: {
					id: id
				},
				transaction: transaction
			});

			transaction.commit();

			this.body = {
				statusCode: 200,
				reasonPhrase: "OK",
				description: "delete group succeed",
				groupId: id
			};
			return ;
		}
		catch (error) {
            console.log(error);
			transaction.rollback();

			this.status = 500;
			this.body = {
				statusCode: 500,
				reasonPhrase: "Internal Server Error",
				description: "delete group failed",
				errorCode: 5004
			};
			return ;
		}
    }
);

module.exports = router.routes();
