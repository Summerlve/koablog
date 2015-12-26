"use strict";
// test router '/files'
const request = require("request");
const configs = require("./configs.json");
const assert = require("assert");
const util = require("util");

// configs
const routerPrefix = "/files";
const authentications = "/authentications";
const protocol = configs.app.protocol;
const host = configs.app.host;
const port = configs.app.port;
