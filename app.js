"use strict";
// loading config file and add to global
const configs = require("./configs");
global.configs = configs;

// app init
const app = require("koa")();

// db and redis init, set path etc.
require("./configs/configs");

// gzip compress
if (configs.gzip) {
    const compress = require("koa-compress");
    app.use(compress());
}

// middleware
app.use(require("./middlewares/pageNotFound"));
app.use(require("./middlewares/unauthorized"));

// static files
const serve = require("koa-static");
const staticFilePath = global.path.static;
app.use(serve(staticFilePath));

// session
const session = require("koa-session");
app.keys = ["koaBlog"];
app.use(session(app));

// load all router
app.use(require("./routes/abouts"));
app.use(require("./routes/articles"));
app.use(require("./routes/authentications"));
app.use(require("./routes/panels"));
app.use(require("./routes/roots"));
app.use(require("./routes/tags"));
app.use(require("./routes/users"));
app.use(require("./routes/groups"));
app.use(require("./routes/files"));

// listen
const port = configs.app.port;
app.listen(port);
