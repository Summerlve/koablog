"use strict";
// upload files include images, audios and videos.
const router = require("koa-router")();
const parse = require("co-busboy");
const path = require("path");
const fs = require("fs");
const staticPath = global.path.static;

router
    .post(
        "/files",
        function* (next) {
            let parts = parse(this);
            let part;
            let store = path.join(staticPath, "images", "test.jpg");

            while (part = yield parts) {
                let stream = fs.createWriteStream(store);
                part.pipe(stream);
                console.log('uploading %s -> %s', part.filename, stream.path);
            }

            this.status = 200;
            this.body = "/images/test.jpg";
        }
    );

module.exports = router.routes();
