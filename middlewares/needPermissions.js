"use strict";
// 将权限拦截器写在外部的中间件中
let Permission = require("../models/Permission").Permission;
let Article = require("../models/Article").Article;

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

    // needs is a array.
    // like follows:
    // [
    //     {
    //         name:"permission name",
    //         error: {
    //             statusCode: 401,
    //             body: {
    //                 errorCode: "1004"
    //             }
    //     },
    //     {
    //         name:"permission name",
    //         error: {
    //             statusCode: "1004"
    //         }
    //     }
    //
    // ]

    for (let i = 0; i < needs.length; i++) {
        let value = needs[i];
        if (!ownPermissions.has(allPermissions.get(value.name))) {
            this.status = value.error.statusCode;
            this.body = value.error.body;
        }

        if (value.name = "deleteSelfArticle") {
            // get userId and from muddleware getIdentity.js
			let userId = this.userId;

			// get article's id
			let id = this.id;

			let isOwn = yield Article.find({
				where: {
					id: id,
					user_id: userId
				}
			});

			isOwn = isOwn.length === 1 ? true : false;

            if (!isOwn) {
                this.status = value.error.statusCode;
                this.body = value.error.body;
            }
        }
    }

    yield next;
}

module.exports = needPermissions;
