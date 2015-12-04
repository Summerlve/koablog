"use strict";

const router1 = require("koa-router")();
const router2 = require("koa-router")();
const one = require("koa-router")();
one.get("/", function* (next) {
    console.log("jjjj");
});
one.get("/:id", function* (next) {
    console.log(this.params.id);
});

router1.get("/foo/bar", function* (next) {
    console.log("router2");
});


router1.use(
    "/foo/bar",
    one.routes(),
    function* (next) {
        console.log("router1 midd 1");
        yield next;
    },
    function* (next) {
        console.log("router1 midd 2");
        yield next;
    }
);



module.exports = router1.routes();
