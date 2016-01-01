"use strict";
// upload files include images, audios and videos.
const router = require("koa-router")();
const prefix = "/files";
router.prefix(prefix);

// import module
const configs = require("../configs/configs");
const parse = require("co-busboy");
const path = require("path");
const fs = require("fs");
const uuid = require("node-uuid");
const verifyToken = require("../middlewares/verifyToken");
const getIdentity = require("../middlewares/getIdentity");
const filter = require("../middlewares/permissionsFilter");

// path
const staticFilePath = configs.path.static;

// upload files
router.post("/",
    verifyToken,
    getIdentity,
    filter({
        only: "upload_files"
    }),
    function* (next) {
        let parts = parse(this, {
            // extension check , allow only .jpg .gif .png
            checkFile: function (fieldname, file, filename) {
                if ([".jpg", ".png", ".gif", ".jpeg"].indexOf(path.extname(filename)) === -1) {
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

// delete files
router.delete("/",
    verifyToken,
    getIdentity,
    filter({
        only: "delete_files"
    }),
    function* (next) {

    }
);

module.exports = router.routes();
