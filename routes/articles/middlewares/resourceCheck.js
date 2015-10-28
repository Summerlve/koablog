"use strict";
// 检查请求的资源是否存在

let ArticleView = require("../../../models/Article").ArticleView;

function* filter (next) {
    // 从路由那边获取参数
    let id = this.params.id;

    let article = yield ArticleView.find({
        where: {
            id: id
        }
    });

    // 资源不存在和id不是数字都404
    if (article === null || isNaN(parseInt(id, 10))) {
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
    this.id = parseInt(id, 10);
    this.resource = article;

    yield next;
}

module.exports = filter;
