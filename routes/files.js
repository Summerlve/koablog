"use strict";
// upload files include images, audios and videos.
const router = require("koa-router")();

router
    .post(
        "/files",
        function* (next) {
            this.body = "upload files";

        }
    );

module.exports = router.routes();
