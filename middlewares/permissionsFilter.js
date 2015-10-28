"use strict";
// 将权限拦截器写在外部的中间件中
// 在needs中的填写很多的权限无外乎两种关系，and 和 or，当然也可以嵌套

let Permission = require("../models/Permission").Permission;
let Article = require("../models/Article").Article;
let PermissionToGroup = require("../models/Permission").PermissionToGroup;

// 从传入的权限描述对象中取出所有的权限名字
function getStrings (value) {
    let strings = [];

    let inner = function inner (value) {
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
            strings.push(value);
        }
    };

    inner(value);
    return strings;
}

// 递归判断用户是否能够通过filter
function passHandler (value, pair) {
    if (value instanceof Object) {
        for (let key in value) {
            if (key === "and") {
                return value[key].reduce(function (pre, cur) {
                    return passHandler(pre, pair) && passHandler(cur, pair);
                });
            }

            if (key === "or") {
                return value[key].reduce(function (pre, cur) {
                    return passHandler(pre, pair) || passHandler(cur, pair);
                });
            }
        }
    }
    else if (typeof value === "string"){
        return pair.get(value);
    }
}

function getAllPermissions (context) {
    return function* () {
        let allPermissions = new Map();

        let pers = yield Permission.findAll();
        pers.forEach(value => allPermissions.set(value.name, value.id));

        this.allPermissions = allPermissions;
    }.bind(context)();
}

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

function permissionsFilter (needs) {
    // 返回一个Generator函数
    return function* permissionsFilter (next) {
        // needs must be object.
        if (!(needs instanceof Object)) {
            console.error("needs must be Object");
            this.status = 500;

            return ;
        }

        // get all permissions
        yield* getAllPermissions(this);
        let allPermissions = this.allPermissions;

        // get own permissions
        yield* getOwnPermissions(this);
        let ownPermissions = this.ownPermissions;

        // filter
        // 存放permission 与 false/true，表示用户是否拥有这个permission
        let pair = new Map();

        // 将needs中的权限的name字符串全部取出来
        let allPermissioStrings = getStrings(needs);

        for (let i = 0; i < allPermissioStrings.length; i++) {
            let item = allPermissioStrings[i];

            if (!ownPermissions.has(allPermissions.get(item))) {
                pair.set(item, false);
            }
            else {
                pair.set(item, true);
            }

            // 检查该文章是否属于作者
            if (item.toLowerCase().indexOf("self") !== -1) {
                // get userId and from muddleware getIdentity.js
    			let userId = this.userId;

    			// get article's id from routes param handler
    			let id = this.id;

                // get resource from resourceCheck
    			let article = this.resource;

                if (article.user_id !== userId) {
                    pair.set(item, false);
                }
                else {
                    pair.set(item, true);
                    this.article = article; // 将这个记录挂到context上面
                }
            }
        }

        let isPass = passHandler(needs, pair);

        if (!isPass) {
            this.status = 401;
            this.body = {
                statusCode: 401,
                reasonPhrase: "Unauthorized",
                description: "insufficient permission",
                errorCode: 1000
            };

            return ;
        }

        yield next;
    };
}

module.exports = permissionsFilter;
