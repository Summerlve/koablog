"use strict";
// 将权限拦截器写在外部的中间件中
// 在needs中的填写很多的权限无外乎两种关系，and 和 or，当然也可以嵌套

let Permission = require("../models/Permission").Permission;
let Article = require("../models/Article").Article;
let PermissionToGroup = require("../models/Permission").PermissionToGroup;

function getPermissionString (o) {
    let permissions = [];

    let inner = function inner () {
        if (value instanceof Object) {
            for (let key in value) {
                if (key === "and") {
                    value[key].forEach(value => inner(value));
                }

                if (key === "or") {
                    value[key].forEach(value => inner(value));
                }
            }
        }
        else if (typeof value === "string"){
            permissions.push(value);
        }
    };

    inner();
    return permissions;
}

function passHandler (value) {
    if (value instanceof Object) {
        for (let key in value) {
            if (key === "and") {
                return value[key].reduce(function (pre, cur) {
                    return passHandler(pre) && passHandler(cur);
                });
            }

            if (key === "or") {
                return value[key].reduce(function (pre, cur) {
                    return passHandler(pre) || passHandler(cur);
                });
            }
        }
    }
    else if (typeof value === "string"){
        return pair.get(value);
    }
}

function permissionsFilter (needs) {
    // 返回一个Generator函数
    return function* permissionsFilter (next) {
        // needs must be object.
        if (!(needs instanceof Object)) {
            console.error("needs must be Object");
            this.status = 500;

            return ;
        }


        /*
            get all permissions
        */
        let allPermissions = new Map();

        let pers = yield Permission.findAll();

        pers.forEach(value => allPermissions.set(value.name, value.id));


        /*
            get own permissions
        */
        let groupId = this.groupId;

        let own = yield PermissionToGroup.findAll({
            attributes: ["permission_id"],
            where: {
                group_id: groupId
            }
        });

        let ownPermissions = new Set();

        own.forEach(value => ownPermissions.add(value.permission_id));

        console.dir(allPermissions);
        console.dir(ownPermissions);


        /*
            filter
        */
        // 存放permission 与 false/true，表示用户是否拥有这个permission
        let perPair = new Map();

        let

        for (let i = 0; i < needs.length; i++) {
            let item = needs[i];

            if (!ownPermissions.has(allPermissions.get(item.permission))) {
                pair.set(item.permission, false);
            }
            else {
                pair.set(item.permission, true);
            }

            // 检查是否删除的是自己的文章，作者拥有删除自己文章和修改自己文章的权限。
            if (item.permission.toLowerCase.indexOf("self")) {
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
                    pair.set(item.permission, false);
                }
                else {
                    pair.set(item.permission, true);
                }
            }
        }

        // 解析needs的关系嵌套。
        // 如果是and与or的关系，则为数组
        // 如果是具体的权限就是对象了
        // judge whether user have permission.

        console.log("pair:");
        console.dir(pair);
        
        let canPass = passHandler(perPair);

        console.log("canPass", canPass);


        yield next;
    };
}

module.exports = permissionsFilter;
