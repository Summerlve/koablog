"use strict";
// app init
let app = require("koa")();

/* 	config:
 *	this is configuration file.
 *  database's config set into global.db
 *  path's config set into global.path
 *  for more details , see the config.js file.
 */
require("./configs/config");

/*	middleware:
 *	the pageNotFound middleware is handle all of the 404 error for whole situation.
 */
let pageNotFound = require("./middlewares/pageNotFound");
app.use(pageNotFound);

// static files
let serve = require("koa-static");
let staticFilePath = global.path.static;
app.use(serve(staticFilePath));

// session
let session = require("koa-session");
app.keys = ["koaBlog"];
app.use(session(app));

// routes loader
let loader = require("./routes/loader");
loader(app);

// gzip compress
let compress = require("koa-compress");
app.use(compress())

let port = 8080;
app.listen(port);
