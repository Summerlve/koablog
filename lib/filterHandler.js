"use strict";
// 根据提供的needs（需要的权限关系）来判断用户能否通过filter

module.exports = function filterHandler (value, pair) {
    if (value instanceof Object) {
        for (let key in value) {
            if (key === "and") {
                if (value[key].length >= 2) {
                    return value[key].reduce(function (pre, cur) {
                        return filterHandler(pre, pair) && filterHandler(cur, pair);
                    });
                }
                else if (value[key].length === 1) {
                    return filterHandler(value[key][0], pair);
                }
            } else if (key === "or") {
                if (value[key].length >= 2) {
                    return value[key].reduce(function (pre, cur) {
                        return filterHandler(pre, pair) || filterHandler(cur, pair);
                    });
                }
                else if (value[key].length === 1) {
                    return filterHandler(needs[key][0], pair);
                }
            } else if (key === "only") {
                return filterHandler(value[key], pair);
            }
        }
    }
    else if (typeof value === "string"){
        return pair.get(value);
    }
};
