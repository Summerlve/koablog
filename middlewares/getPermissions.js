"use strict";
/*
 * get permissions
 */

let PermissionToGroup = require("../models/Permission").PermissionToGroup;

function* getPermissions (next) {
    //get group_id from middleware identity
    let groupId = this.groupId;
    let permissions = yield PermissionToGroup.findAll({
        where: {
            group_id: groupId
        }
    });

    this.permissions = [];

    permissions.forEach((value) => {
        this.permissions.push(value.permission_id);
    });

    yield next;
}

module.exports = getPermissions;
