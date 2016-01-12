"use strict";
const router = require("koa-router")();
const configs = require("../configs/configs");

// load controllers
const abouts = require("../controllers/abouts");


// abouts
router.get("/abouts", abouts.get);

// articles


module.exports = router.routes();
