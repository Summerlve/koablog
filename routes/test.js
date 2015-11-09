"use strict";

const router = require("koa-router")();
const one = require("koa-router")();
const two = require("koa-router")();

one.get("/one", function* (next) {
    console.log("one");
    console.log(this.params.id);
    this.body = "123";
    return ;
});


router.use(
    "/test/:id",
    function* (next) {
        console.log("asdfadf");
        yield next;
    },
    one.routes()
);

module.exports = router.routes();
