"use strict";
// 将权限拦截器写在外部的中间件中
// 在needs中的填写很多的权限无外乎两种关系，and 和 or，当然也可以嵌套，当只需满足一个权限的时候就是only
// 这个中间件需要和getToken和getIdentity配合使用

const getAllPermissions = require("./getAllPermissions");
const getOwnPermissions = require("./getOwnPermissions");
const Article = require("../models/Article").Article;

module.exports = function permissionsFilter (needs) {
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
        // 将needs中的权限字符串全部取出来
        let allPermissioStrings = getStrings(needs);

        // 存放permission 与 false/true，表示用户是否拥有这个permission
        let pair = new Map();

        // 判断用户是否拥有单个的权限，如果是文章的操作要检查文章是否属于作者
        for (let i = 0; i < allPermissioStrings.length; i++) {
            let item = allPermissioStrings[i];

            if (!ownPermissions.has(allPermissions.get(item))) {
                pair.set(item, false);
            }
            else {
                pair.set(item, true);
            }

            // 检查该文章是否属于作者
            if (item === "delete_private_articles" || item === "update_private_articles") {
    			// get article's id from routes param handler
                let id = parseInt(this.params.id, 10);

    			if (isNaN(id)) {
    				this.status = 404;
    				return ;
    			}

    			let article = yield Article.find({
    				where: {
    					id: id
    				}
    			});

                if (article === null) {
                    this.status = 404;
    				return;
                }

                // get userId and from muddleware getIdentity.js
    			let userId = this.userId;

                if (article.user_id === userId) pair.set(item, true);
                else pair.set(item, false);
            }

            if (item === "update_private_users") {
                // get user's id from routes param handler
                let id = parseInt(this.params.id, 10);

                if (isNaN(id)) {
    				this.status = 404;
    				return ;
    			}

                // get userId and from muddleware getIdentity.js
    			let userId = this.userId;

                if (userId === id) pair.set(item, true);
                else pair.set(item, false);
            }
        }

        // 根据提供的needs（需要的权限关系）来判断用户能否通过filter
        let isPass = passHandler(needs, pair);

        if (!isPass) {
            switch (this.accepts(["html", "json"])) {
                case "html": {
                    this.status = 401;
                    this.body = "rinima";
                    return ;
                }break;
                case "json": {
                    this.status = 401;
                    this.body = {
                        statusCode: 401,
                        reasonPhrase: "Unauthorized",
                        description: "insufficient permission",
                        errorCode: 1000
                    };
                    return ;
                }break;
                default: {
                    this.throw(406, "json and html only");
    				return ;
                }
            }
        }

        yield next;
    };
};

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

// 根据提供的needs（需要的权限关系）来判断用户能否通过filter
function passHandler (value, pair) {
    if (value instanceof Object) {
        for (let key in value) {
            if (key === "and") {
                if (value[key].length >= 2) {
                    return value[key].reduce(function (pre, cur) {
                        return passHandler(pre, pair) && passHandler(cur, pair);
                    });
                }
                else if (value[key].length === 1) {
                    return passHandler(value[key][0], pair);
                }
            } else if (key === "or") {
                if (value[key].length >= 2) {
                    return value[key].reduce(function (pre, cur) {
                        return passHandler(pre, pair) || passHandler(cur, pair);
                    });
                }
                else if (value[key].length === 1) {
                    return passHandler(value[key][0], pair);
                }
            } else if (key === "only") {
                return passHandler(value[key], pair);
            }
        }
    }
    else if (typeof value === "string"){
        return pair.get(value);
    }
}
