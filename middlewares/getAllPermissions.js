"use strict";
// get all permissions
let Permission = require("../models/Permission").Permission;

function* getAllPermissions (next) {
    let allPermissions = new Map();

    let pers = yield Permission.findAll();
    pers.forEach(value => allPermissions.set(value.name, value.id));

    this.allPermissions = allPermissions;

    yield next;
}

module.exports = getAllPermissions;
