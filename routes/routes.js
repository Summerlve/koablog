"use strict";
const router = require("koa-router")();
const configs = require("../configs/configs");

// load controllers
const About = require("../controllers/About");
const Article = require("../controllers/Article");
const Authentication = require("../controllers/Authentication");
const File = require("../controllers/File");

// load middlewares
const verifyToken = require("../middlewares/verifyToken");
const getIdentity = require("../middlewares/getIdentity");
const filter = require("../middlewares/filter");
const checkArticle = require("../middlewares/checkArticle");

// /abouts
router.get("/abouts", About.index);

// /articles
router.get("/articles", Article.index);
router.get("/articles/:id", checkArticle, Article.one);
router.post("/articles", verifyToken, getIdentity,
    filter({
        and: ["create_articles", "create_tags"]
    }),
    Article.add);

router.put("/articles/:id", verifyToken, getIdentity,
    filter({
        and: [
            "create_tags",
            {or: ["update_articles", "update_private_articles"]}
        ]
    }),
    checkArticle,
    Article.update);

router.delete("/articles/:id", verifyToken, getIdentity,
    filter({
        or: ["deletet_articles", "delete_private_articles"]
    }),
    checkArticle,
    Article.remove);

// /authentications
router.post("/authentications", Authentication.login);
router.put("/authentications", verifyToken, Authentication.check);
router.delete("/authentications", verifyToken, Authentication.logout);

// /files
router.post("/files", verifyToken, getIdentity, filter({ only: "upload_files" }), File.upload);
router.delete("/files", verifyToken, getIdentity, filter({ only: "delete_files" }), File.remove);

// /groups

// /panels

// /roots
// /tags
// /users

module.exports = router.routes();
