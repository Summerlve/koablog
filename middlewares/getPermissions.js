"use strict";
/*
 * get permissions
 */

let PermissionToGroup = require("../models/Permission").PermissionToGroup;

function* getPermissions (next) {
    //get group_id from middleware identity
    let group_id = this.group_id;
    let permissions = PermissionToGroup.findAll({
        where: {
            group_id: group_id
        }
    });
    
    console.log(permissions.length);
}
