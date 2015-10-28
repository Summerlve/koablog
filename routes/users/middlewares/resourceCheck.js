"use strict";
// 检查请求的资源是否存在

let User = require("../../../models/User");

function* filter (next) {
    // 从路由那边获取参数
    let pen_name = this.params.pen_name;

    let author = yield User.find({
        where: {
            pen_name: pen_name
        }
    });

    // 资源不存在和id不是数字都404
    if (author === null) {
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

    // 将article的id和此条记录添加到context上面
    this.pen_name = pen_name;
    this.resource = author;

    yield next;
}

module.exports = filter;
