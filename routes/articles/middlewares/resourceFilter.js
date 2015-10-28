"use strict";

function* filter () {
    if (isNaN(parseInt(id, 10))) {
        // id不是数字的情况，就404。
        this.status = 404;
        this.body = "article not found";
        return ;
    }
    else {
        this.id = parseInt(id, 10);
    }
    yield next;
}

module.exports = filter;
