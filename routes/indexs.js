"use strict";
// it's the root directory of this web app
const router = require("koa-router")();

// redirect '/' to the '/articles'
router.redirect("/", "/users");

module.exports = router.routes();
