"use strict";
// test router '/groups'
const request = require("request");
const configs = require("./configs.json");
const assert = require("assert");
const util = require("util");
const jwt = require("jsonwebtoken");
const moment = require("moment");

// configs
const routerPrefix = "/groups";
const authentications = "/authentications";
const protocol = configs.app.protocol;
const host = configs.app.host;
const port = configs.app.port;
const cert = configs.jwt.cert;
