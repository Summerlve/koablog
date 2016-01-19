"use strict";
// import modules
const parse = require("co-body");
const Group = require("../models/Group");
const configs = require("../configs/configs");
const sequelize = configs.sequelize;

// index
// GET
module.exports.index = function* index (next) {
    // return all (just 2 group, may be will have more groups) groups
    let groups = yield Group.findAll();
    this.body = groups;
    return ;
};

// get one of groups
// GET
module.exports.one = function* one (next) {
    let group = this.group;

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
};

// create a new group
// POST
module.exports.add = function* add (next) {
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
};

// update a groupId
// PUT
module.exports.update = function* update (next) {
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
};

// delete a group
// DELETE
module.exports.remove = function* remove (next) {
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
};
