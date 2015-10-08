"use strict";
/*
 * get permissions
 *  this.permissions is a map from id to name , get permissions's id by name.
 *  for more details , see the table 'koablog_permission'.
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

    this.permissions = new Map();

    permissions.forEach((value) => {
        this.permissions.set(value.name, value.id);
    });

    console.log(this.permissions);

    yield next;
}

module.exports = getPermissions;
