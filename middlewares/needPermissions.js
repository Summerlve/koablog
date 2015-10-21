"use strict";
// 将权限拦截器写在外部的中间件中
let Permission = require("../models/Permission").Permission;

function* needPermissions (next, needs) {
    // get all permissions
    let allPermissions = new Map();

    let pers = yield Permission.findAll();

    pers.forEach(value => allPermissions.set(value.name, value.id));


    // get own permissions
    let groupId = this.groupId;

    let own = yield PermissionToGroup.findAll({
        where: {
            group_id: groupId
        }
    });

    let ownPermissions = new Set();

    own.forEach(value => ownPermissions.add(value.id));

    if (!(needs instanceof Array)) {
        console.error("needs must be array");
        this.status = 500;
        return ;
    }

    [
        [
            "permission name",
            {
                statusCode: "1004"
            }

        ]
    ]


    yield next;
}

module.exports = needPermissions;
