"use strict";
const router = require("koa-router")();
const configs = require("../configs/configs");

// load controllers
const Application = require("../controllers/Application");
const About = require("../controllers/About");
const Article = require("../controllers/Article");
const Authentication = require("../controllers/Authentication");
const File = require("../controllers/File");
const Group = require("../controllers/Group");
const Panel = require("../controllers/Panel");
const Root = require("../controllers/Root");
const Tag = require("../controllers/Tag");
const User = require("../controllers/User");

// load middlewares
const verifyToken = require("../middlewares/verifyToken");
const getIdentity = require("../middlewares/getIdentity");
const filter = require("../middlewares/filter");
const checkArticle = require("../middlewares/checkArticle");
const checkTag = require("../middlewares/checkTag");
const checkUser = require("../middlewares/checkUser");
const checkGroup = require("../middlewares/checkGroup");

// index
router.get("/", Application.index);

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
router.get("/groups", verifyToken, getIdentity,
    filter({
        only: "read_groups"
    }),
    Group.index);

router.get("/group/:id", verifyToken, getIdentity,
    filter({
        only: "read_groups"
    }),
    checkGroup,
    Group.one);

router.post("/groups", verifyToken, getIdentity,
    filter({
        only: "create_groups"
    }),
    Group.add);

router.put("/groups/:id", verifyToken, getIdentity,
    filter({
        only: "update_groups"
    }),
    checkGroup,
    Group.update);

router.delete("/groups/:id", verifyToken, getIdentity,
    filter({
        only: "delete_groups"
    }),
    checkGroup,
    Group.remove);

// /panels
router.get("/panels", Panel.index);

// /roots
router.get("/roots", Root.index);

// /tags
router.get("/tags", Tag.index);
router.get("/tags/:id", checkTag, Tag.one);

router.post("/tags", verifyToken, getIdentity,
    filter({
        only: "create_tags"
    }),
    Tag.add);

router.put("/tags/:id", verifyToken, getIdentity,
    filter({
        only: "update_tags"
    }),
    checkTag,
    Tag.update);

router.delete("/tags/:id", verifyToken, getIdentity,
    filter({
    	only: "delete_tags"
    }),
    checkTag,
    Tag.remove);

// /users
router.get("/users", User.index);
router.get("/users/:id", checkUser, User.one);

router.post("/users", verifyToken, getIdentity,
    filter({
        and: ["create_users", "read_groups"]
    }),
    User.add);

router.put("/users/:id", verifyToken, getIdentity,
    filter({
        or: ["update_users", "update_private_users"]
    }),
    checkUser,
    User.update);

router.put("/users/:id/group", verifyToken, getIdentity,
    filter({
        only: "promote_users"
    }),
    checkUser,
    User.change);

router.delete("/users/:id", verifyToken, getIdentity,
    filter({
    	only: "delete_users"
    }),
    checkUser,
    User.remove);

module.exports = router.routes();
