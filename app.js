"use strict";
// app init
const app = require("koa")();

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
const pageNotFound = require("./middlewares/pageNotFound");
app.use(pageNotFound);

// static files
const serve = require("koa-static");
const staticFilePath = global.path.static;
app.use(serve(staticFilePath));

// session
const session = require("koa-session");
app.keys = ["koaBlog"];
app.use(session(app));

// routes loader
app.use(require("./routes/abouts"));
app.use(require("./routes/articles"));
app.use(require("./routes/authentications"));
app.use(require("./routes/panel"));
app.use(require("./routes/root"));
app.use(require("./routes/tags"));
app.use(require("./routes/users"));
app.use(require("./routes/groups"));

// gzip compress
const compress = require("koa-compress");
app.use(compress())

const port = 8080;
app.listen(port);
