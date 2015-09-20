"use strict";

function createQueryObj (o) {
    let where = {};
    let order = [];
    let attributes = [];
    let offset = 0;
    let limit = 0;

    let temp = {
        where: where,
        order: order,
        offset: offset,
        limit: limit,
        attributes: attributes
    };

    temp.where = o.where ? void 0 : o.where;
    temp.order = o.order ? void 0 : o.order;
    temp.offset = o.offset ? void 0 : o.offset;
    temp.limit = o.limit ? void 0 : o.limit;
    temp.attributes = o.attributes ? void 0 : o.attributes;

    var queryObj = null;

    for (let key in temp) {
        if (key !== void 0) query.key = temp.key;
    }
}

module.exports = createQueryObj;
