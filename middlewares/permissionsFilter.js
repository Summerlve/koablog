"use strict";
// 将权限拦截器写在外部的中间件中
let Permission = require("../models/Permission").Permission;
let Article = require("../models/Article").Article;
let PermissionToGroup = require("../models/Permission").PermissionToGroup;

// needs is a array like follows:
//[
//     {
//         permission: "deleteSelfArticle",
//         httpResponse: {
//             statusCode: 401,
//             httpBody: {
//                 statusCode: 500,
//                 reasonPhrase: "Internal Server Error",
//                 description: "add article fialed",
//                 errorCode: 1009
//             }
//         }
//     },
//     {
//         permission: "deletetArticle",
//         httpResponse: {
//             statusCode: 401,
//             httpBody: {
//                 statusCode: 500,
//                 reasonPhrase: "Internal Server Error",
//                 description: "add article fialed",
//                 errorCode: 1009
//             }
//         }
//     }
// ]

function permissionsFilter (needs) {
    return function* permissionsFilter (next) {
        // get all permissions
        let allPermissions = new Map();

        let pers = yield Permission.findAll();

        pers.forEach(value => allPermissions.set(value.name, value.id));

        // get own permissions
        let groupId = this.groupId;

        let own = yield PermissionToGroup.findAll({
            attributes: ["permission_id"],
            where: {
                group_id: groupId
            }
        });

        let ownPermissions = new Set();

        own.forEach(value => ownPermissions.add(value.permission_id));

        if (!(needs instanceof Array)) {
            console.error("needs must be array");
            this.status = 500;

            return ;
        }

        for (let i = 0; i < needs.length; i++) {
            let item = needs[i];
            console.dir(allPermissions);
            console.dir(ownPermissions);
            if (!ownPermissions.has(allPermissions.get(item.permission))) {
                console.log(11123123);
                this.status = item.httpResponse.statusCode;
                this.body = item.httpResponse.httpBody;

                return ;
            }

            // 检查是否删除的是自己的文章，作者拥有删除自己文章的权限。
            if (item.permission === "deleteSelfArticle") {
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
                    this.status = item.httpResponse.statusCode;
                    this.body = item.httpResponse.httpBody;

                    return ;
                }
            }
        }

        yield next;
    };
}

module.exports = permissionsFilter;
