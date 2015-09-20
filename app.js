// app init
var app = require("koa")();

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
var pageNotFound = require("./middlewares/pageNotFound");
app.use(pageNotFound);

// static files
var serve = require("koa-static");
var staticFilePath = global.path.static;
app.use(serve(staticFilePath));

// session
var session = require("koa-session");
app.keys = ["koaBlog"];
app.use(session(app));

// routes loader
var loader = require("./routes/loader");
loader(app);

// gzip compress
var compress = require("koa-compress");
app.use(compress())

var port = 8080;
app.listen(port);



