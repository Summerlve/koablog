"use strict";
// 从传入的权限描述对象中取出所有的权限名字

module.exports = function getPermissionName (needs) {
    let strings = [];

    let inner = function inner (value) {
        if (value instanceof Object) {
            for (let key in value) {
                if (key === "and") {
                    value[key].forEach(value => inner(value));
                }
                else if (key === "or") {
                    value[key].forEach(value => inner(value));
                }
                else if (key === "only") {
                    inner(value[key]);
                }
            }
        }
        else if (typeof value === "string"){
            strings.push(value);
        }
    };

    inner(needs);
    return strings;
};
