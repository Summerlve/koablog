"use strict";
/*
 * get permissions
 *  this.permissions is a map from id to name , get permissions's id by name.
 *  for more details , see the table 'koablog_permission'.
 */

let PermissionToGroup = require("../models/Permission").PermissionToGroup;

function* getOwnPermissions (next) {
    //get group_id from middleware identity
    let groupId = this.groupId;
    let permissions = yield PermissionToGroup.findAll({
        attributes: ["permission_id"],
        where: {
            group_id: groupId
        }
    });

    this.ownPermissions = new Set();

    permissions.forEach((value) => {
        this.ownPermissions.add(value.id);
    });

    yield next;
}

module.exports = getOwnPermissions;
