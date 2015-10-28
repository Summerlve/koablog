"use strict";
// 检查请求的资源是否存在

function* filter (next) {
    let id = this.params.id;
    if (isNaN(parseInt(id, 10))) {
        // id不是数字的情况，就404。
        switch (this.accepts("json", "html")) {
            case "html": {
                this.status = 404;
                this.body = "Not Found";

                return ;
            }break;
            case "json": {
                this.status = 404;
                this.body = {
                    statusCode: 404,
                    reasonPhrase: "Not Found",
                };

                return ;
            }break;
            default: {
                this.throw(406, "json and html only");
            }
        }
    }

    this.id = parseInt(id, 10);

    yield next;
}

module.exports = filter;
