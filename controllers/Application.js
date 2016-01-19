"use strict";

module.exports.index = function* index (next) {
    this.status = 301;
    this.redirect("/articles");
};
