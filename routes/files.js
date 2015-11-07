"use strict";
// upload files include images, audios and videos.
const router = require("koa-router")();
const parse = require("co-busboy");
const path = require("path");
const fs = require("fs");
const uuid = require("node-uuid");
const staticFilePath = global.path.static;

router
    .post(
        "/files",
        function* (next) {
            let parts = parse(this, {
                // extension check , allow only .jpg .gif .png
                checkFile: function (fieldname, file, filename) {
                    console.dir(file);
                    if ([".jpg", ".png", ".gif"].indexOf(path.extname(filename)) === -1) {
                        var error = new Error('invalid file extension allow only .jpg .gif .png');
                        error.status = 400;
                        return error;
                    }
                }
            });

            let part;
            let fileName = uuid.v1();

            while (part = yield parts) {
                let extension = path.extname(part.filename); // get extension
                fileName += extension; // the final file name
                let store = path.join(staticFilePath, "images", fileName); // the store path
                let stream = fs.createWriteStream(store); // create a stream to write file
                part.pipe(stream);
            }

            this.status = 200;
            this.body = path.join("/images", fileName);
            return ;
        }
    );

module.exports = router.routes();
