"use strict";

const PermissionToGroup = require("../models/Permission").PermissionToGroup;

function getOwnPermissions (context) {
    return function* () {
        let groupId = this.groupId;

        let own = yield PermissionToGroup.findAll({
            attributes: ["permission_id"],
            where: {
                group_id: groupId
            }
        });

        let ownPermissions = new Set();
        own.forEach(value => ownPermissions.add(value.permission_id));

        this.ownPermissions = ownPermissions;
    }.bind(context)();
}

module.exports = getOwnPermissions;
