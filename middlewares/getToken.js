/* 获取token的中间件
 * 将获取的token添加到context上
 *  this.token
 *  this.tokenType
 */
var jwt = require("jsonwebtoken");
var cert = global.cert;
var redisClient = global.redisClient;

function* getToken (next) {
    // get token from http request header field 'Authorization'.
    var authorization = this.get("authorization");
    if (!authorization) {
        this.status = 401;
        this.body = {
            status_code: 401,
            error_description: "there is no token in the http request header field 'Authorization'"
        }
        return ;
    }

    // get the token and token's type.
    var tokenType = authorization.split(" ")[0];
    var token = authorization.split(" ")[1];

    // 尝试检查token是否能够解析，如果不能的话有很大可能是伪造的。
    try {
        var decode = jwt.verify(token, cert);
    } catch (e) {
        this.status = 400;
        this.body = {
            status_code: 400,
            error_description: "wrong token"
        }

        return ;
    }

    // 在reids里面查找token，如果没有找到的话，应该可以确定是伪造的了。
    var isTokenExsit = redisClient.co_get(token);
    if (!isTokenExsit) {
        this.status = 400;
        this.body = {
            status_code: 400,
            error_description: "token do not exsit, please log in again"
        }

        return ;
    }

    this.token = token;
    this.tokenType = tokenType;

    yield next;
}

module.exports = getToken;
