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
let about = require("./routes/about");
let articles = require("./routes/articles");
let authorization = require("./routes/authentication");
let authors = require("./routes/authors");
let panel = require("./routes/panel");
let tags = require("./routes/tags");
let users = require("./routes/users");

app.use(about);
app.use(articles);
app.use(authorization);
app.use(authors);
app.use(panel);
app.use(tags);
app.use(users);

// gzip compress
let compress = require("koa-compress");
app.use(compress())

let port = 8080;
app.listen(port);
